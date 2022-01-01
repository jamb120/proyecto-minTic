import { createContext, useEffect, useState } from 'react';
import { server } from '../config';

export const context = createContext();

export default function Provider({ children }) {
    
    const [publications, setPublications ] = useState([]);
    const [user, setUser] = useState(false);
    const [renderData, setRenderData] = useState([]);

    useEffect(()=>{
        const readerPublications = async ()=>{
            const request = await fetch(`${server}/publication`);
            const result = await request.json();
            setPublications(result);
        }
        const readerUser =  async ()=>{
            const request = await fetch(`${server}/user/read/${localStorage.getItem('id')}`);
            const result = await request.json();
            setUser(result);
        }
        localStorage.getItem('auth') === 'true' ? readerUser() : localStorage.setItem('auth', false);
        readerPublications();
    }, [])

    return (
        <context.Provider value={{ publications, setPublications, user, setUser, renderData, setRenderData}} >
            { children }
        </context.Provider>
    )
}
