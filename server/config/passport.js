const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User.model')
const { google } = require('googleapis');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => 
    {
      let newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        contacts: [],
      }
      try {
        let user = await User.findOne({ googleId: profile.id });


        
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          contactsfill(accessToken,refreshToken,user._id);
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  });

}

const contactsfill = async (accessToken,refreshToken,id) =>
{ 
  const authObj = new google.auth.OAuth2({
    access_type: 'offline',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `http://localhost:5000/`,
    scope: [`https://www.googleapis.com/auth/contacts`]
  });
  authObj.setCredentials({
    access_token: accessToken,
    // refresh_token: refreshToken,
  });
  const service = google.people({
    version: "v1",
    auth:authObj
  });

  let contactsouter = [];
  service.people.connections.list({
    resourceName: "people/me",
    pageSize: 1000,
    personFields: "names,emailAddresses,phoneNumbers,photos",
    requestSyncToken: true,
    // pageToken: pageToken
  },async (err,res)=>{
    if (err) return console.error("The API returned an error: " + err);
    const connections = res.data.connections;
    const contacts =[];
    connections.forEach((contact)=>{
      const obj = {
        name : contact.names[0].displayName,
        email: contact.emailAddresses[0].value,
        phone : contact.phoneNumbers[0].value,
        photo: contact.photos[0].url
      }
      contacts.push(obj)
    })
    console.log(contacts)
    contactsouter = contacts; 
    
    const user = await User.findByIdAndUpdate({
      _id:id
    },{
      $set :{
        contacts:contacts
      }
    })
  })
  console.log({contactsouter:contactsouter});
}