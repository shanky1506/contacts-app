const express = require('express')
const router = express.Router()

// @desc Login 
// @ route GET / 
router.get('/',(req,res)=>{
    res.send('Login')
})
// @desc 
router.get('/user',(req,res)=>{
    res.send('USER')
})

module.exports = router