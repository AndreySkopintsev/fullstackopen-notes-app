const mongoose = require('mongoose')

// const url = process.env.MONGODB_URI
const url =  `mongodb+srv://chen_rules:Chen123.@my-database-vydwb.mongodb.net/note-app?retryWrites=true&w=majority
`

console.log('connection to',url)

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res =>{
    console.log('connected to MongoDB')
})
.catch((error)=>{
    console.log('error connecting to MongoDB:',error.message)

})

const noteSchema = new mongoose.Schema({
    content:String,
    date:Date,
    important:Boolean,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)