const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// const value = {type: String, required:true, unique: true, min: 4, }

const PostSchema = new Schema({
    title: {type: String, required:true, unique: true, min: 4, },
    summary: String,
    content: String,
    cover: String,
    author:[{type:Schema.Types.ObjectId, ref:'User'}]

}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema)

module.exports = PostModel; 
