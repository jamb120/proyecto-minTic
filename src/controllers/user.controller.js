const user = require('../models/user');
const { server } = require('../config');
const publication = require('../models/publication');

const userCtrl = {};

//Leer un usuario
userCtrl.readOneUser = async (req, res)=>{
    const readUser = await user.findById(req.params.id);
    res.json(readUser).end();
}

//validar si la contraseña existe
userCtrl.validateEmail = async ()=>{
    const userEmail = await findOne({email: req.params.email});
    if(userEmail) return res.json({enabled: false}).end();
    res.json({enabled: true}).end();
}

//Crear usuario
userCtrl.createUser = async (req, res, next)=>{
    let {name, email, phone, country, city, password} = req.body;
    let avatar = req.file == undefined 
        ?`${server}/public/avatars/defaultavatar.png`
        :`${server}/public/avatars/${req.file.filename}`;

    const newUser = new user({name, email, phone, country, city, password, avatar});

    const userSaved = await newUser.save();
    res.json({status: true, user: userSaved}).end();
}

//Validar contraseña
userCtrl.validatePassword = (req, res)=>{
    const {email, password} = req.body;
    user.findOne({email}, (err, usuario)=>{
        if(!usuario) return res.json({ state: false }).end(); //Si el usuario no existe
        else{
            usuario.comparePassword(password, (err, equal)=>{
                if(equal) return res.json({state: true, user: usuario}).end()//Si los datos son correctos
                else return  res.json({ state: false }).end(); //Si la contraseña es incorrecta
            })
        }
    })
}

//Logout
userCtrl.logout = async (req, res)=>{
    await req.logout();
    res.send('Logout exitoso');
}

userCtrl.updateUser = async (req, res)=>{
    let {name, email, phone, country, city, password} = req.body;
    let avatar = `${server}/public/avatars/${req.file.filename}`;

    const userUpdate = await user.findByIdAndUpdate(req.params.id, {$set: {name, email, phone, country, city, password, avatar}})
    res.json({status: true, user: userUpdate}).end();
}

userCtrl.deleteUser = async (req, res)=>{
    await user.findByIdAndRemove(req.params.id);
    const publicationsDeleted =  await publication.findOneAndRemove({idUser: req.params.id });
    res.json({state: true, publicationsDeleted }).end();
}

module.exports = userCtrl;