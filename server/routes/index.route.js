const express = require('express');
const { find } = require('../models/User.model');
const router = express.Router()
const User = require('../models/User.model');

// @desc Login 
// @ route GET / 
router.get('/',(req,res)=>{
    console.log({homereq : req})
    res.json({
        Login : "Logged in"
    })
})
// @desc 
router.get('/user',(req,res)=>{
    try{
        console.log({ userreq: req.user })
        res.json({
            hello: "Hi",
            user: req.user
        })
    } catch(e){
        res.status(400).json({message : e})
    }
})

// @desc getContacts 
// @route GET /contacts/:id
router.get('/contacts/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        let contacts;
        const user = await User.findById(id)
        contacts = user.contacts;
        if (contacts.length > 0) {
            res.status(200).json(contacts)
        } else {
            res.status(201).json({
                message: " This account has no contacts"
            })
        }
    } catch(e){
        res.status(400).json(e)
    }
})
module.exports = router