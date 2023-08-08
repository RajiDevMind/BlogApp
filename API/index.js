const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const cors = require('cors');
const app = express();
const fs = require('fs')


// for secret connection string in dotenv
const connectDB = require('./db/connect');
require('dotenv').config();

const multer = require("multer")
const uploadMiddleware = multer({dest: "uploads/"})

// password encryption
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const secret = "indhhdhr4u38939djk"

const UserRequirements = require('./models/user');
const UserPosts = require('./models/post');

// middleware
app.use(cors({credentials:true, origin:'http://localhost:5173'}));
// middleware to parse json from the request
app.use(express.json());    
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'))
// app.use(express.static('uploads'))

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;    
    try{
        const userDetails = await UserRequirements.create({username, email, password:bcrypt.hashSync(password, salt)});
        res.json({userDetails});
    }catch(e) {
        res.status(400).json(e);
        console.log(e);
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const userDetails = await UserRequirements.findOne({email})
        const passOk = bcrypt.compareSync(password, userDetails.password);
        
        if(passOk){
            // logged in
            jwt.sign({email, id:UserRequirements._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id:UserRequirements._id,
                email,
            });
        })
        }else {
            res.status(400).json('wrong details!')
        }    
    }catch(e){
        res.status(400).json(e)
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    try{
        jwt.verify(token, secret, {}, (err, info) => {
          if(err) throw err;
          res.json(info)
      })
    }catch(error){
        res.json("Kindly Login!!!")
        console.log("Token is undefined since you have not Login!!!")
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

const error = "There is no exception! Kindly filled all inputs."

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    // res.json({files:req.file})
    if(!req.file){
        return error
    }else{
        // renaming file before sending to DB
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);

        const {token} = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {

            if(err) throw err;
            if(!req.body){
                return
            }else{
                const {title, summary, content} = req.body;
                const postDoc = await UserPosts.create({
                    title,
                    summary,
                    content,
                    cover:newPath,
                    author:info.id,
                })
                res.json(postDoc);
            }
    }
    )}   
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {

    if (req.file){
        let newPath;
        // renaming file before sending to DB
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {

            if(err) throw err;
            const {id, title, summary, content} = req.body;
            const postDoc = await UserPosts.findById(id);
            // res.json({'ingo':req.body.id})
            const isAuthor = JSON.stringify(postDoc._id) === JSON.stringify(req.body.id);
            if(!isAuthor){
                return res.status(4000).json("You're not the author of this post!")
            }
            await postDoc.updateOne({
                title,
                summary,
                content,
                cover:newPath ? newPath : postDoc.cover,
            })
            res.json(postDoc)
    })
})

app.get('/post', async (req, res) => {
    // const posts = await UserPosts.find().populate('author', ['email'])
    res.json(
        await UserPosts.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20))
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await UserPosts.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

const port = 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await app.listen(port, () => {
            console.log(`listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()