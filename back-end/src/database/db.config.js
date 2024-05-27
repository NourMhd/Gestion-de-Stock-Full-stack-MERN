const config = require('../config/config');
const mongoose = require('mongoose');
const db = {};
mongoose.Promise = global.Promise;
mongoose.set('strictQuery',false);
db.mongoose = mongoose;
db.url = config.DB_URL;

db.responsables= require('../api/models/responsableModel')(mongoose);
db.produits= require('../api/models/produitModel')(mongoose);

module.exports = db;