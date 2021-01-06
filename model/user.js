const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post',
                // required:true
            }
        }
    ],
    ads: [
        {
            ad: {
                type: Schema.Types.ObjectId,
                ref: 'ad',
                // required:true
            }
        }
    ]
},
    {
        timestamps: true
    })

module.exports = mongoose.model('user', userSchema)