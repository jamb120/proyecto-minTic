import { Box, Button, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {context} from '../context/Provider';
import { useContext } from 'react';

export default function PanelControl() {
    const navigate = useNavigate();
    const { user } = useContext(context)
    return (
        <Box>
            <Avatar alt={user.name} src={user.avatar} sx={{ width: 100, height: 100}}/>
            <Typography variant="h6" sx={{mt:4}}>INFORMACIÓN PERSONAL</Typography>
            <Typography variant="subtitle2">{user.name}</Typography>
            <Typography variant="subtitle2">{user.country}</Typography>
            <Typography variant="subtitle2">{user.city}</Typography>

            <Typography variant="h6" sx={{mt:4}}>INFORMACIÓN DE CONTACTO</Typography>
            <Typography variant="subtitle2">{user.phone}</Typography>
            <Typography variant="subtitle2">{user.email}</Typography>
            <Button onClick={()=> navigate('/settings')} sx={{mt:4}}>CONFIGURACIÓN</Button>
        </Box>
    )
}
