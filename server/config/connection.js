const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks1');

// Change the name of the database for avoid duplication error 

module.exports = mongoose.connection;
