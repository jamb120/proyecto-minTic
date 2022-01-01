import PublicationEdit from '../components/Publication.edit';
import { context } from '../context/Provider';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import Form from '../components/Form';
import PanelControl from '../components/PanelControl';

export default function MyProfile() {

    const { publications } = useContext(context);

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',  m: 3}}>
            <Box>
                <PanelControl/>
                <Form/>
            </Box>
            <Box sx={{ gridColumn: 'span 2', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'start'}}>
                {
                    publications.map(item => <PublicationEdit url={item.url} id={item._id} email={item.email} name={item.name} key={item._id}/>)
                }
            </Box>
        </Box>
    )
}
