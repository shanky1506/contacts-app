const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()

require('./config/passport')(passport)


const app = express()
app.use(morgan('tiny'))

//Session middleware 

app.use(session({
    secret :'keyboard cat',
    resave:false,
    saveUninitialized:false,
}))

// Passport MiddleWare
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use('/',require('./routes/index.route'))
app.use('/auth',require('./routes/auth.route'))


const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

connectDB()

app.listen(port,() => {
    console.log(`Server is running on port : ${port}`);
})

/* 
// mongoose.connect(uri, {
//     useNewUrlParser : true,
//     useCreateIndex : true,
//     useUnifiedTopology: true
// });

// const connection = mongoose.connection;

// connection.once('open',()=>{
//     console.log("MongoDB database Connection established")
// })
*/