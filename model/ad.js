const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adSchema = new Schema({
    
        description:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
            // require:true
        },
        price:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        creator:{
            type:Schema.Types.ObjectId,
            ref:'user'
        }
        
    
},
{
    timestamps : true
})

module.exports = mongoose.model('ad',adSchema)