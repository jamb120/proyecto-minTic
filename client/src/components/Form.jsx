import { useState, useContext } from 'react';
import { context } from '../context/Provider';
import {server} from '../config';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const styleInput ={
    width: '100%', 
    mt:2
}

export default function Form() {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(null);
    const { publications, setPublications, user} = useContext(context);

    //Métodos
    const handleUploadImg = function(e){
        const fr = new FileReader()
        fr.readAsDataURL(e.target.files[0])
        fr.addEventListener('load', () => {
            setUrl(fr.result)
        })
    }
    const createPublication = async (e)=>{
        e.preventDefault();

        //Datos
        const form = document.getElementById('form-publication');
        const formdata = new  FormData(form);
        formdata.append('email', user.email);
        formdata.append('idUser', user._id);

        //Petición
        const request = await fetch(`${server}/publication`, {method: 'POST', body: formdata});
        const result = await request.json();

        //Pintarlo en el dom
        setPublications([...publications, result]);

        //RESETS
        form.reset();
        setOpen(false);
        setUrl(null);
    }

    return (
        <>
            <Button onClick={()=>setOpen(true)}>CREAR PUBLICACIÓN</Button>
            
            <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:2}}>
                        CREAR PUBLICACIÓN
                    </Typography>

                    <Box component="img" height="200px" width="400px" src={url ? url : "https://picsum.photos/400/200?random"} alt="aleatorio" sx={{objectFit: 'cover'}}/>
                    <form id="form-publication" onSubmit={createPublication}>
                        <TextField id="outlined-basic" label="Título" required sx={styleInput} name="name"/>
                        <TextField id="outlined-basic" label="Categoría" required sx={styleInput} name="category"/>
                        <TextField id="outlined-basic" label="Descripción" required sx={styleInput} multiline rows={4} name="description"/>
                        
                        <Button variant="outlined" component="label" sx={styleInput}>
                            CARGAR IMAGEN
                            <input type="file" hidden name="publication" onChange={handleUploadImg} required/>
                        </Button>
                        <Button variant="contained" type="submit" sx={styleInput} >ENVIAR</Button>
                    </form>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Puedes hacer que tus publicaciones aparezcan en primera linea si tienen muchos likes, o adquiriendo el plan para promocionar tu perfil
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
