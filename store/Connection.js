const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://puc_hugo:puc_hugo@cluster0-iot04.mongodb.net/pucminas?retryWrites=true';

mongoose.connect(connectionString);
mongoose.Promise = global.Promise;

module.exports = mongoose;
