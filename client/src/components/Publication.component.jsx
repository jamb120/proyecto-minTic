import {ImageListItem, ImageListItemBar, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {useNavigate} from 'react-router-dom';

export default function PublicationComponent({id, url, name, email}) {
    const navigate = useNavigate();
    return (
        <ImageListItem key={id} sx={{objectFit: 'cover'}} >
            <img
                src={url}
                alt={name}
                loading="lazy"
                style={{height: 300}}
            />
            <ImageListItemBar
                title={name}
                subtitle={email}
                actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${name}`}
                        onClick={()=> navigate(`/publication/${id}`)}
                    >
                        <InfoIcon />
                    </IconButton>
                }
                />
        </ImageListItem>
    )
}
