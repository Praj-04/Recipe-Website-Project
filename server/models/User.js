const mongoose = require('mongoose')

const userSchema =mongoose.Schema({
    email : {type : String, unique: true, required: true, lowercase:true},
    password : {type :String, required:true,select:false},
    name :{ type:String, required:true},
    recipes : [{type: mongoose.Schema.Types.ObjectId, ref: 'recipe'}] //to display recipes in admin edit page
})

module.exports = mongoose.model('user',userSchema);
