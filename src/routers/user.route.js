const userCtrl = require('../controllers/user.controller');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const router = Router();

//settings multer
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public', 'avatars'),
    filename: (req, file, cb)=>{ cb(null, file.originalname)}
});
const upload = multer({ storage });

//Leer un usuario
router.get('/read/:id', userCtrl.readOneUser);

//Crear usuario
router.post('/sign-up', upload.single('avatar'), userCtrl.createUser);

//Validar contraseña
router.post('/login', userCtrl.validatePassword);

//Actualizar usuario
router.put('/update/:id', upload.single('avatar'), userCtrl.updateUser );

//Eliminar Usuario
router.delete('/delete/:id', userCtrl.deleteUser);

//Logout
router.get('/logout', userCtrl.logout);

module.exports = router;