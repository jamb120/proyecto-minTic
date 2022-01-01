import {useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { server } from '../config';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { context } from '../context/Provider';

const steps = ['', '', '', ''];

export default function SignUp() {
    const [avatar, setAvatar ] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const {setUser} = useContext(context)
    const navigate = useNavigate();


    //Formulario
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [avatarFile, setAvatarFile] = useState('');
    const [password, setPassword] = useState('');

    const isStepOptional = (step) => {
        return step === 2;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const handleUploadAvatar = (e)=>{
        const fr = new FileReader()
        fr.readAsDataURL(e.target.files[0])
        fr.addEventListener('load', () => {
            setAvatar(fr.result);
            setAvatarFile(e.target.files[0]);
        })
    }

    const createUser = async ()=>{
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', nombre);
        formData.append('phone', phone);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('password', password);
        formData.append('avatar', avatarFile);

        const request = await fetch(`${server}/user/sign-up`, {method: 'POST', body: formData});
        const result = await request.json();
        if(result.status){
            localStorage.setItem('id', result.user._id);
            localStorage.setItem('auth', true);
            setUser(result.user);
            handleNext();
        }
    }

    return (
    <Box sx={{p:4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '78vh'}}>
        <Card sx={{ width: 450 }} variant="outlined" >
            <Stepper activeStep={activeStep} sx={{mt:1}}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
            <>
                <>
                    <Typography sx={{ mt: 2, mb: 1, ml:2 }}>
                        CUENTA CREADA
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box component="img" width="210px" height="150px" src={logo} />
                        <Typography sx={{mt: 2}}>
                            Bienvenido a CreatiBook
                        </Typography>
                        <Typography variant="caption">
                            Gracias por registrarte
                        </Typography>
                    </Box>
                </>
                <CardActions sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button onClick={()=> navigate('/')} sx={{ml: 'auto'}}>
                        INICIAR
                    </Button>
                </CardActions>
            </>
            ) : (
                <>
                    <Box sx={{ p: 2}} component="form" autoComplete="off">
                        {activeStep === 0 ?(
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    REGISTRARSE
                                </Typography>
                                <TextField id="outlined-required" label="Correo electrónico" sx={{width: '100%'}} value={email} required onChange={e=> setEmail(e.target.value)}/>
                            </>
                        )
                        : activeStep === 1 ?(
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    DATOS PERSONALES
                                </Typography>
                                <TextField id="outlined-basic" label="Nombre" sx={{width: '100%'}} value={nombre} required onChange={e=> setNombre(e.target.value)}/>
                                <TextField id="outlined-number" label="Teléfono"  type="number" sx={{width: '100%', mt:2}} onChange={e=> setPhone(e.target.value)}/>
                                <TextField id="outlined-basic" label="País" sx={{width: '100%', mt:2}} onChange={e=> setCountry(e.target.value)}/>
                                <TextField id="outlined-basic" label="Ciudad" sx={{width: '100%', mt:2}} onChange={e=> setCity(e.target.value)}/>
                            </>
                        )
                        :activeStep === 2 ?(
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    SELECCIONA TU AVATAR
                                </Typography>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2}}>
                                    <Avatar src={avatar ? avatar : `${server}/public/avatars/defaultavatar.png`} sx={{ width: 120, height: 120 }}/>
                                    <Button variant="outlined" component="label" sx={{mt: 2}}>
                                        CARGAR IMAGEN
                                        <input type="file" hidden name="avatar" onChange={handleUploadAvatar} required/>
                                    </Button>
                                </Box>
                            </>
                        )
                        :activeStep === 3 ?(
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    CREA UNA CONTRASEÑA
                                </Typography>
                                <TextField id="outlined-basic" type="password" label="Contraseña" sx={{width: '100%', mt:2}} onChange={e=> setPassword(e.target.value)} />
                            </>
                        ):null}
                    </Box>
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            ATRAS
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={activeStep === steps.length - 1 ? createUser :handleNext}>
                            {activeStep === steps.length - 1 ? 'FINALIZAR' : 'SIGUENTE'}
                        </Button>
                    </CardActions>
                </>
            )}
        </Card>
    </Box>
);}
