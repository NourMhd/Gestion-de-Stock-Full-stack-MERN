module.exports = app => {
    const router = require('express').Router();
    const produitController= require('../controllers/produitController');
    const responsableController= require('../controllers/responsableController');


    router.post('/produits', produitController.create)
    router.get('/produits', produitController.findAll);
    router.get('/produits/:id', produitController.findOne);
    router.delete('/produits/:id', produitController.delete);
    router.put('/produits/:id', produitController.update);
   
   
   
   
    router.post('/responsables', responsableController.create)
    router.get('/responsables', responsableController.findAll);
    router.get('/responsables/:id', responsableController.findOne);
    router.delete('/responsables/:id', responsableController.delete);
    router.put('/responsables/:id', responsableController.update);
    router.post('/responsables/login', responsableController.login)



    app.use('/api/',router);
}
