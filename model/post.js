const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    
        description:{
            type:String,
            required:true
        },
        image:{
            type:String,
            // require:true
        },
        hasImage:{
            type:Boolean,
            required:true
        },
        likes:{
            type:Number
        },
        creator:{
            type:Schema.Types.ObjectId,
            ref:'user',
            required:true
        }
        
    
},
{
    timestamps : true
})

module.exports = mongoose.model('post',postSchema)