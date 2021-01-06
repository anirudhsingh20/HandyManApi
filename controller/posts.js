
const Post = require('../model/post')
const User = require('../model/user')

exports.createPost = (req, res, next) => {
    const description = req.body.description
    const hasImage = req.body.hasImage
    const creator = req.body.creator
    const Image = req.file
    if (!Image) {

        let post = new Post({
            description: description,
            hasImage: hasImage,
            creator: creator
        })
        post.save()
            .then(post => {
               return  User.findById(creator)
            })
            .then(user=>{
                user.posts.push({post:post._id})
                return user.save()
            })
            .then(()=>{
                res.status(200).json({
                    message: 'post added ',
                    post: post
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500
                }
                next(err)
            })

    }
    else {
        const imageUrl = `http://localhost:8080/images/${Image.filename}`
        let post = new Post({
            description: description,
            hasImage: hasImage,
            image: imageUrl,
            creator: creator
        })


        post.save()
            .then(post => {
                return User.findById(creator)
            })
            .then(user=>{
                user.posts.push({post:post._id})
                return post.save()
            })
            .then(()=>{
                res.status(200).json({
                    message: 'post added ',
                    post: post
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500
                }
                next(err)
            })
    }

}

exports.getPosts = (req, res, next) => {
    Post.find()
        .populate('creator')
        .sort({ createdAt: "desc" })
        .then(posts => {
            if (!posts) {
                const err = new Error('post not found')
                err.statusCode = 500
                throw err
            }
            res.status(200).json({ message: 'post fetched', posts: posts })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
                next(err)
            
        })
}

exports.likePost = (req, res, next) => {
    const postId = req.body.postId
    // console.log(postId);
    Post.findOne({_id:postId}).
    then(post=>{
        if(!post){
            const err = new Error('post not found for like')
            err.statusCode = 404
            throw err
        }
        post.likes = post.likes ? post.likes + 1 : 1
        return post.save()

    })
    .then(post=>{
        if(!post){
            const err = new Error('post not found for like')
            err.statusCode = 404
            throw err
        }
        return res.status(200).json({
            post:post
        })
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500
        }
            next(err)
    })
}