import { useParams } from "react-router-dom";
import { useTheme } from "../../context/context";
import { useEffect, useState } from 'react';
import '../../styles/detail/character.css';

export default function CharacterDetail(){
    const {id} = useParams();
    const { theme } = useTheme();
    const [personaje, setPersonaje] = useState(null)

    useEffect(() => {
        const fetchPersonaje = async () => {
            const data = await getCharacter(id);
            setPersonaje(data);
        }
        
        fetchPersonaje();
    }, [])

    

    return(
        <div className={`base-${theme}`}>
           
            <div className={`base-personaje-${theme}`}>
                <h1>{personaje?.name}</h1>
                <div className={`container-personaje-${theme}`}>
                    
                    <div className={`img-personaje-${theme}`}>
                        <img src={personaje?.image} alt={personaje?.name} />
                    </div>
                    <div className={`info-personaje-ind-${theme}`}>
                        <p><strong>Status:</strong> {personaje?.status}</p>
                        <p><strong>species:</strong> {personaje?.species}</p>
                        <p><strong>gender:</strong> {personaje?.gender}</p>
                        
                        <p><strong>origin:</strong> {personaje?.origin.name}</p>
                        
                        {personaje?.type === "" ? (
                            <p><strong>Type:</strong> </p>
                        ) : (
                            <p><strong>Type:</strong> {personaje?.type}</p>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

async function getCharacter(id) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return response.json();
}
