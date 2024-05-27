const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')
var refreshTokens={}

const db = require('../../database/db.config');

const responsableModel = require('../models/responsableModel'); 

exports.create = (req, res) => {
    // Récupération des données
    const {nom, prenom, login, password, matricule} = req.body;
    

    if (!login) {
        return res.status(400).send({
            message: 'Le contenu ne peut pas être vide'
        });
    }

    const newResponsable = {
        
        nom: nom,
        prenom: prenom,
        login: login,
        password: password,
        matricule: matricule,
        
        
    };

    responsableModel.create(newResponsable)
        .then(Responsables => {
            res.status(201).send({
                message: 'Responsable crée avec succès',
                data: Responsables
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: 'Une erreur s\'est produite lors de la création du Responsable'
            });
        });
},


exports.findAll = (req, res) => {
    responsableModel.find({
  }).then((Responsables) => {
   res.json({message:' Clients affichés',status:200, data:Responsables})
  }).catch((err) =>{
      console.log(err);
      res.json({message:'Erreur d`afficher les Responsables',status:500, data:null})

  });
},


exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({message:"content is required"});

    }
    responsableModel.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
}

//modification par id
exports.update =(req, res) =>{ 
    const { nom, prenom, login, password, matricule } = req.body;
    

    if (!cin || !phone) {
        return res.status(400).send({
            message: 'Le contenu ne peut pas être vide'
        });
    }

    responsableModel.findByIdAndUpdate(_id=req.params.id,
        {  
            nom: nom,
            prenom: prenom,
            login: login,
            password: password,
            matricule: matricule,

            }, 

        {useFindAndModify: false}).then((data) =>{

    if(!data){ 
        res.status(404).send({ message: `Can not update Responsable with id=${id}`});
     } 
    res.status(200).send({ message: `Responsable was successfully updated`}); 
    
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
  responsableModel.findByIdAndDelete(id).then((data) => {
      if(!data){
          res.status(404).send({message:"Erreur"});

      }
      res.status(200).send({message: "Responsable supprimé avec  succes"});

  })

};
exports.login = function (req, res, next) {
    const { login, password } = req.body; // Extraction de login et password du corps de la requête

    // Vérification si login est défini dans le corps de la requête
    if (!login || !password) {
        return res.status(400).json({ status: 400, message: "Identifiant ou mot de passe manquant.", data: null });
    }

    responsableModel.findOne({ login }) // Utilisation de login extrait pour trouver l'utilisateur
        .then(userInfo => {
            if (!userInfo) {
                return res.status(401).json({ status: 401, message: "Identifiant ou mot de passe incorrect.", data: null });
            }

            bcrypt.compare(password, userInfo.password)
                .then(isMatch => {
                    if (isMatch) {
                        const tokenPayload = { id: userInfo._id };
                        const accessToken = jwt.sign(tokenPayload, req.app.get('secretkey'), { expiresIn: '24h' });
                        const refreshToken = jwt.sign(tokenPayload, req.app.get('secretkey'), { expiresIn: '24h' });

 res.status(200).json({
    status: 200,
    message: "Connexion réussie.",
    data: {
        user: userInfo,
        accessToken: accessToken,
        refreshToken: refreshToken
    }
 });
                    } else {
                        res.status(401).json({ status: 401, message: "Identifiant ou mot de passe incorrect.", data: null });
                    }
                })
                .catch(err => {
                    console.error("Erreur lors de la comparaison des mots de passe:", err);
                    res.status(500).json({ status: 500, message: "Une erreur s'est produite lors de la connexion.", data: null });
                });
        })
        .catch(err => {
            console.error("Erreur lors de la recherche de l'utilisateur:", err);
            res.status(500).json({ status: 500, message: "Une erreur s'est produite lors de la connexion.", data: null });
        });
};





    
    
    
    
  
  

