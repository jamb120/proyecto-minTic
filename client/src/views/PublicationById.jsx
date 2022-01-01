import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../config'

export default function PublicationById() {
    const { id } = useParams();
    const [publication, setPublication] = useState({});

    useEffect(()=>{
        const readOnePublication = async ()=>{
            const request = await fetch(`${server}/publication/${id}`);
            const result = await request.json();
            console.log(result)
            setPublication(result);
        }
        readOnePublication();
    }, [id])

    return (
        <div>
            {id}
            <p>{publication.email}</p>
            <p>{publication.name}</p>
            <p>{publication.url}</p>
        </div>
    )
}
