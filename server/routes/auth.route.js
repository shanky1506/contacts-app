const express = require('express')
const passport = require('passport')
const router = express.Router()

const frontEndDomain=`http://localhost:3000`;
// @desc Auth with Google 
// @ route GET /auth/google 
router.get('/google',passport.authenticate('google',{scope:['profile','https://www.googleapis.com/auth/contacts','https://www.googleapis.com/auth/contacts.readonly']}))

// @desc Google Auth callback
// GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google',{failureRedirect: '/' }),
    (req,res) => {
        res.redirect(`${frontEndDomain}/contacts/${req.user.id}`)
    }
)

// @desc Logout user
// @route /auth/logout
router.get('/logout',(req,res) =>{
    req.logout()
    res.redirect('/')
})

module.exports = router