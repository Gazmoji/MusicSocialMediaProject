const mongoose = require('mongoose')

const userpostSchema = new mongoose.Schema({
    postTitle: String,
    postBody: String,
    postDate: Date
})

const UserPost = mongoose.model('UserPost', userpostSchema)
module.exports = UserPost