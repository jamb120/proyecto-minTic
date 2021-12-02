const { server } = require('../config');
const publication = require('../models/publication');

const publicationsCtrl = {}

//Leer todas las publicaciones
publicationsCtrl.readerPublications = async (req, res)=>{
    const allPublications = await publication.find();
    res.json(allPublications).end();
}

//Crear publicación
publicationsCtrl.createPublication = async (req, res)=>{
    let {name, email, idUser, description, category} = req.body;
    const newPublication = new publication({name, email, description, category, idUser, url: `${server}/public/publications/${req.file.filename}`});
    const result = await newPublication.save();
    res.json(result).end();
}

//Leer publicaciones de un usuario
publicationsCtrl.readerPublicationsUser = async (req, res)=>{
    const readPublications = await publication.find({idUser: req.params.id});
    res.json(readPublications).end();
}

//Leer una sola publicación
publicationsCtrl.readOnePublication = async (req, res)=>{
    const readPublication = await publication.findById(req.params.id);
    res.json(readPublication).end();
}

//Actualizar una publicación
publicationsCtrl.updateOnePublication = async (req, res)=>{
    let {name, email, idUser} = req.body;
    const updatePublication = await publication.findByIdAndUpdate(req.params.id, {name, email, idUser, url:`${server}/public/publications/${req.file.filename}`});
    res.json(updatePublication).end();
}

//Eliminar publicación
publicationsCtrl.deletePublication = async (req, res)=>{
    await publication.findByIdAndRemove(req.params.id);
    res.json({state: true}).end();
}

module.exports = publicationsCtrl;