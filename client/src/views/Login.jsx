import { Button,TextField,Box, Card, CardActions, CardContent, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import {context} from '../context/Provider';
import logo from "../assets/logo.svg";
import Swal from 'sweetalert2';
import {server} from '../config';

//import { InputAdornment, IconButton, OutlinedInput } from '@mui/material'
//import {VisibilityOff,Visibility } from '@mui/icons-material';


export default function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message, setMessage]= useState('');
    const { setUser } = useContext(context);
    const navigate = useNavigate();

    const login = async e => {
        e.preventDefault();

        const request = await fetch(`${server}/user/login`, {method: 'POST', body: JSON.stringify({email,password}), headers: {'Content-Type': 'application/json'}});
        const result = await request.json();
        console.log(result);

        if(result.state === true){
            localStorage.setItem('auth', true);
            localStorage.setItem('id', result.user._id);
            setUser(result.user);
            
            Swal.fire({
                icon: 'success',
                title: `Bienvenido ${result.user.name}`,
                showConfirmButton: false,
                timer: 2500
            })
            navigate('/');
        }else{
            setMessage('Correo o contraseña incorrectos');
        }
    }
    /* 
    //******************propiedades de la contraseña ************************
        const [values, setValues] = React.useState({
            password: '',
            showPassword: false,
        });

        const handleClickShowPassword = () => {
            setValues({
            ...values,
            showPassword: !values.showPassword,
            });
        };
            
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
    */

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', flexDirection: 'column'}}>
            {message ? <Card variant="outlined" sx={{width:487, mb:2}}> <Alert severity="error" sx={{width: '100%'}}>{message}</Alert></Card>: null}
            <Card variant="outlined" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img
                    src={logo}
                    height="150"
                    alt="CreatiBook-logo"
                    style={{marginTop: '40px'}}
                />
                <form  onSubmit={login} >
                    <CardContent>
                        {/* Campos de texto */}

                        <TextField
                            type="email"
                            className="form-control"
                            id="outlined-required"
                            label="Correo..."
                            autoComplete="email"
                            margin="normal"
                            required
                            autoFocus
                            fullWidth
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                        <TextField
                            type="password"
                            className="form-control"
                            id="outlined-password-input"
                            label="Contraseña..."
                            autoComplete="current-password"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e)=>setPassword(e.target.value)}
                        /> 

                        {/* ****************campo para mostrar contraseña **************/}
                        {/* 
                            <OutlinedInput
                                id="outlined-password-input"
                                value={values.password}
                                className="form-control"
                                label= "contraseña"
                                required
                                onChange={(e)=>setContrasena(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            /> 
                        */}
                        {/* ************************************************ */}
                    </CardContent>

                    {/* inicio de botones */}
                    <CardActions>
                        <Button 
                            type="submit"
                            variant="contained" 
                            margin="normal"
                            sx={{ mt: 2, mb: 2, mr: 2 }}> 
                            Iniciar Sesión
                        </Button>

                        <Button 
                            variant="outlined" 
                            margin="normal"
                            onClick={()=> navigate('/sign-up')}
                            sx={{ mt: 2, mb: 2}}>
                                Registrarse
                        </Button>      
                    </CardActions>               
                </form>
            </Card>
        </Box>
    )
}
