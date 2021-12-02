const mongoose = require('mongoose');
const { URI } = require('./config');

mongoose.connect(URI)
    .catch(err => console.log('Error' + err));

mongoose.connection.on('open', ()=>{
    console.log('database is connected and open');
});

module.exports = mongoose;