const {model, Schema}= require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    name : {type: String, required: true, unique: true, lowercase: true}, //Lowercase: se guarda en minusculas, unique: debe ser único en la base de datos
    email: {type: String, required: true},
    phone: String, 
    country: String, 
    city: String, 
    password: {type: String, required: true},
    avatar: String,
    notifications: Array
},{
    timestamps: true, //Agrega unas propiedades adicionales, como la fecha de creación y actualización
    collection: 'users'
});

//Antes de guardar el usuario
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next(); //Si el usuario actualiza alguno de los campos de su perfíl, pero su contraseña no sufrió modificaciones, se continua con el preoceso de guardado.

    //pero si ('password') sufre modificaciones, encriptamos la contraseña
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) next(err);

        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err) next(err);
            user.password = hash;
            next();
        })
    })
});

//creamos un método para comparar la información (login)
userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, equal)=>{
        if(err) return cb(err);
        cb(null, equal);
    })
}

//Exporto el modelo
module.exports = new model('user', userSchema);