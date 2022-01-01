import { useState ,useEffect, useContext} from 'react';
import {context} from '../context/Provider';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import {server} from '../config';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Avatar from '@mui/material/Avatar';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, Box, Typography} from '@mui/material'

export default function Settings() {

    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const [name,setName]= useState('');
    const [phone,setPhone]= useState('');
    const [country,setCountry]= useState('');
    const [city,setCity]= useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState();
    
    const navigate = useNavigate();
    const {user, setUser }= useContext(context);

    useEffect(()=>{
        setCity(user.city);
        setName(user.name);
        setAvatar(user.avatar);
        setPhone(user.phone);
        setEmail(user.email);
        setCountry(user.country);
    }, [user])

    /* subida de la imagen nueva */
    const Input = styled('input')({
        display: 'none',
    });

    const handleUploadAvatar = (e)=>{
        const fr = new FileReader()
        fr.readAsDataURL(e.target.files[0])
        fr.addEventListener('load', () => {
            setAvatar(fr.result);
            setAvatarFile(e.target.files[0]);
        })
    }

    /* actualizar funcion que actualiza los datos */
    
    const updateUser = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('avatar', avatarFile );
        formData.append('name', name);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('email', email);

        const request = await fetch(`${server}/user/update/${user._id}`, {
            method: 'PUT',
            body: formData
        });

        const result = await request.json();

        if(result.status){
            setUser(result.user)
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                showConfirmButton: false,
                timer: 2500
            });
            e.target.reset();
            navigate('/');
        }
    }

    const handleDeleteUser = async ()=>{
        if(window.confirm('¿Estás seguro que quieres eliminar tu cuenta?')){
            const request = await fetch(`${server}/user/delete/${user._id}`, {method: 'DELETE'});
            const result = await request.json();
    
            if(result.state){
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado correctamente',
                    showConfirmButton: false,
                    timer: 2500
                });
                setUser(false);
                navigate('/');
                localStorage.setItem('auth', false);
            }
        }
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', itemsAlign: 'center', width: '95vw'}}>
            <Card variant="outlined" sx={{width: 600}}>
                    <CardContent>
                        <form onSubmit={updateUser}>
                            {/* icono nuevo */}
                            <Stack  justifyContent="center" alignItems="center">
                                <Avatar sx={{ width: 110, height: 110, mb:2}} alt={name} src={avatar}/>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" type="file" onChange={handleUploadAvatar} />
                                    <Button variant="outlined" component="span">
                                        <CreateIcon/> Cambiar
                                    </Button>
                                </label>
                            </Stack>

                            
                            {/* informacion personal */}
                            <Box sx={{mt:4}}>
                                <Typography variant="h6" sx={{mb:3}}><ManageAccountsIcon fontSize="medium" /> INFORMACIÓN PERSONAL</Typography>

                                <Stack justifyContent="center" alignItems="center">
                                        <TextField
                                        required
                                        label="Nombre" 
                                        name="name"
                                        onChange={e => setName(e.target.value)}
                                        sx={{width: '100%', mb:2}}
                                        value={name}/>

                                        <TextField
                                        required
                                        name="country"
                                        label="Pais"
                                        onChange={e => setCountry(e.target.value)} 
                                        sx={{width: '100%', mb:2}}
                                        value={country}/>

                                        <TextField
                                        required
                                        name="city"
                                        label="Ciudad"
                                        onChange={e => setCity(e.target.value)} 
                                        sx={{width: '100%', mb:2}}
                                        value={city} />
                                </Stack>
                            </Box>

                            {/* informacion de contacto*/}
                            <Box >
                                <Typography variant="h6" sx={{mb:3, mt:3}}><PersonIcon fontSize="medium" /> INFORMACIÓN DE CONTACTO</Typography>

                                <Stack  justifyContent="center" alignItems="center">
                                        <TextField
                                        required
                                        label="Correo"
                                        name="email"
                                        onChange={e => setEmail(e.target.value)} 
                                        sx={{width: '100%', mb:2}}
                                        value={email}/>

                                        <TextField
                                        required
                                        label="Telefono"
                                        name="phone"
                                        onChange={(e) => setPhone(e.target.value)} 
                                        sx={{width: '100%', mb:2}}
                                        value={phone}/>
                                </Stack>
                            </Box>

                            {/* contraseña y seguridad*/}
                            <Box>
                                <Typography variant="h6" sx={{mb:3, mt:3}}><AssignmentIndIcon fontSize="medium" /> SEGURIDAD</Typography>
                                
                                <Stack justifyContent="center" alignItems="center">
                                    <TextField 
                                    id="outlined-password-input"
                                    label="Contraseña" 
                                    type="password" 
                                    name="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    sx={{width: '100%', mb:2}}
                                    value={password}/>
                                </Stack>
                            </Box>

                            {/* botones */}

                            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                <Button variant="outlined" color="error" onClick={handleDeleteUser}>Eliminar cuenta</Button>
                                <Button color="primary" variant="contained" type="submit">Guardar</Button>
                            </Stack>
                        </form>
                    </CardContent>
            </Card>
        </Box>
    )
}
