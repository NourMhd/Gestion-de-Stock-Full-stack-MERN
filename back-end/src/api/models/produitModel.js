const mongoose = require('mongoose');

const Schema=mongoose.Schema



const produitModel = new Schema ({
    nom : {
        type : String,         
        required : true
    },

    marque  : {
        type : String,
        required : true
    },

    prix : {
        type : String,
        required : true,
        
    },
    
    quantite:{
        type : String,
        required: true,
      
    },

    description:{
        type : String,
        
        
    },

   
},

  {timestamps :true }

)

module.exports = mongoose.model('produit', produitModel);