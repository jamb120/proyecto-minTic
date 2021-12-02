const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user');

passport.serializeUser((usuario, done)=>{
    done(null, usuario._id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, usuario)=>{
        done(err, usuario)
    });
})

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done)=>{
        User.findOne({email}, (err, usuario)=>{
            if(!usuario) return done(null, false, {message: `Este email: ${email} no está registrado`})
            else{
                usuario.comparePassword(password, (err, equal)=>{
                    if(equal) return done(null, usuario)
                    else return done(null, false, {message: 'La contraseña no es válida'})
                })
            }
        })
    }
))

exports.isAuthenticated = (req, res, next) =>{
    try{
        if(req.isAuthenticated()) return res.json({auth: true})
        res.json({auth: false})
    }catch(err){
        console.log(err);
    }
}