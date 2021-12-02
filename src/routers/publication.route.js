const publicationsCtrl = require('../controllers/publications.controller');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const router = Router();

//settings multer
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public', 'publications'),
    filename: (req, file, cb)=>{ cb(null, file.originalname) }
});
const upload = multer({ storage });

//Leer todas las publicaciones
router.get('/', publicationsCtrl.readerPublications);

//Crear publicación
router.post('/', upload.single('publication'), publicationsCtrl.createPublication);

//Leer publicaciones de un usuario
router.get('user/:id', publicationsCtrl.readerPublicationsUser);

//Leer una sola publicación
router.get('/:id', publicationsCtrl.readOnePublication);

//Actualizar una publicación
router.put('/:id', upload.single('publication'), publicationsCtrl.updateOnePublication);

//Eliminar publicación
router.delete('/:id', publicationsCtrl.deletePublication)

module.exports = router;