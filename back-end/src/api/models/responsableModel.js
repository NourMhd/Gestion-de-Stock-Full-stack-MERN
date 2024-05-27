const mongoose = require('mongoose');

const Schema=mongoose.Schema

const bcrypt = require("bcrypt");

const responsableModel = new Schema ({
    nom : {
        type : String,         
        required : true
    },

    prenom : {
        type : String,
        required : true
    },

   

    login : {
        type : String,
        required : true,
        
    },
    
    password:{
        type : String,
        required: true,
        trim: true
    },

    matricule:{
        type : String,
        //required : true
        
    },

   
},

  {timestamps :true }

)

responsableModel.pre('save',function(next){
    this.password=bcrypt.hash(this.password,10);
    next();
});


module.exports = mongoose.model('responsables', responsableModel);