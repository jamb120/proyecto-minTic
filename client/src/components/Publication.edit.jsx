import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import {server} from '../config';
import {context} from '../context/Provider';
import { useContext, useState } from 'react';
import FormEdit from './FormEdit';

export default function Publication({ id, url, email, name }) {
    const navigate = useNavigate();
    const { publications ,setPublications } = useContext(context)
    const handleDelete = async ()=>{
        const request = await fetch(`${server}/publication/${id}`, {method: 'DELETE'});
        const result = await request.json();
        if(result.state){
            setPublications(publications.filter(item=> item._id !== id));
        }
    }
    const [open, setOpen] = useState(false);

    return (
        <Card sx={{ maxWidth: 345, mb: 3, mr: 1, width: 300}}>
            <CardHeader sx={{ fontSize: 16 }}
                title={name}
                subheader={email}
            />
            <CardMedia
                component="img"
                height="194"
                image={url}
                alt={name}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={handleDelete}>
                    <Delete />
                </IconButton>
                <IconButton aria-label="edit" onClick={()=> setOpen(true)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="info" onClick={()=> navigate(`/publication/${id}`)}>
                    <InfoIcon />
                </IconButton>
            </CardActions>
            <FormEdit open={open} setOpen={setOpen}/>
        </Card>
)
}
