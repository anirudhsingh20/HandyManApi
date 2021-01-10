const Ad = require('../model/ad')
const Schema = require('mongoose')
const User = require('../model/user')

exports.getAd = (req, res, next) => {
    Ad.find()
        .sort({ createdAt: 'desc' })
        .then(ads => {
            if (!ads) {
                const err = new Error('posts not fetched')
                err.statusCode = 500
                throw err
            }
            res.status(200).json({
                message: 'ads fetched',
                ads: ads
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
exports.getAdDetail = (req, res, next) => {
    const id = req.params.id
    Ad.findOne({ _id: id })
        .populate('creator')
        .then(detail => {
            if (!detail) {
                const err = new Error('no details found')
                err.statusCode = 404
                throw err
            }
            return res.status(200).json({
                message: 'ad details',
                ad: detail

            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.createAd = (req, res, next) => {
    if (!req.file) {
        const err = new Error('no image found')
        err.statusCode = 500
        throw err
    }
    const description = req.body.description
    const image = req.file
    const price = +req.body.price
    const type = req.body.type
    const location = req.body.location
    const creator = req.body.creator
    console.log(creator);

    const imageUrl = `https://handy-man-api.herokuapp.com/images/${image.filename}`
    console.log(image.path);
    const ad = new Ad({
        description: description,
        imageUrl: imageUrl,
        price: price,
        type: type,
        location: location,
        creator: creator

    })
    ad.save()
        .then(() => {

           return  User.findById(creator)


        })
        .then(user=>{
            user.ads.push({ad:ad._id})
            return user.save()
        })
        .then(()=>{
            return res.json({ message: 'ad added', ad: ad })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

// exports.saveImage = (req, res, next) => {
//     // const image = req.file.image;
//         console.log(req.body);


//          res.status(200).json({message:'image Saved'})

// }