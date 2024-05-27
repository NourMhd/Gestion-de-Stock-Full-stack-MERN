const db = require('../../database/db.config');

const produitModel = require('../models/produitModel'); 

exports.create = (req, res) => {
    // Récupération des données
    const {nom, description, prix, quantite, marque} = req.body;
    

    if (!prix) {
        return res.status(400).send({
            message: 'Le contenu ne peut pas être vide'
        });
    }

    const newProduit = {
        nom: nom,
        description: description,
        prix: prix,
        quantite: quantite,
        marque: marque,
        
        
    };

    produitModel.create(newProduit)
        .then(Produits => {
            res.status(201).send({
                message: 'Produit créé avec succès',
                data: Produits
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: 'Une erreur s\'est produite lors de la création du produit'
            });
        });
},


exports.findAll = (req, res) => {
    produitModel.find({
  }).then((Produits) => {
   res.json({message:' Clients affichés',status:200, data:Produits})
  }).catch((err) =>{
      console.log(err);
      res.json({message:'Erreur d`afficher les clients',status:500, data:null})

  });
},


exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({message:"content is required"});

    }
    produitModel.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
}

//modification par id
exports.update =(req, res) =>{ 
    const { nom, description, prix, quantite, marque } = req.body;
    

    if (!prix ) {
        return res.status(400).send({
            message: 'Le contenu ne peut pas être vide'
        });
    }

    produitModel.findByIdAndUpdate(_id=req.params.id,
        {  
            nom: nom,
            description: description,
            prix: prix,
            quantite: quantite,
            marque: marque,

            }, 

        {useFindAndModify: false}).then((data) =>{

    if(!data){ 
        res.status(404).send({ message: `Can not update Post with id=${id}`});
     } 
    res.status(200).send({ message: `Post was successfully updated`}); 
    
    }).catch((err) =>{ 
        console.log(err); 
    
    });

},

//suppression par id
exports.delete = (req, res) => {
  const id = req.params.id;
  if(!id) {
      res.status(400).send({message: "content is required"});

  }
  produitModel.findByIdAndDelete(id).then((data) => {
      if(!data){
          res.status(404).send({message:"Erreur"});

      }
      res.status(200).send({message: "Client supprimé avec  succes"});

  })

};





    
    
    
    
  
  

