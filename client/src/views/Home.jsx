import { context } from '../context/Provider';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import PublicationComponent from '../components/Publication.component';

import { ImageList } from '@mui/material';

export default function Home() {
    const { publications, renderData } = useContext(context);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', mt:6 }}>
            <ImageList sx={{ width: '95vw', height: '100vh' }} cols={4} gap={6} rowHeight={300}>
                {
                    renderData.length >=1 
                        ? renderData.map(item => <PublicationComponent name={item.name} email={item.email} id={item._id} url={item.url}/>)
                        : publications.map(item => <PublicationComponent name={item.name} email={item.email} id={item._id} url={item.url}/>)
                }
            </ImageList>
        </Box>
    )
}
