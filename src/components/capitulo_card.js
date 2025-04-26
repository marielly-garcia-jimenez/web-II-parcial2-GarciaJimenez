import { useTheme } from "../context/context";
import "../styles/capitulo-card.css";
// import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Elimina estas importaciones

import { useReducer } from "react";
import { useEffect } from "react";

function handlevotes(state, action){
    if(action.type === "LIKE"){
        return{
            ...state,
            like: state.like + 1
        }
    }

    if(action.type === "DISLIKE"){
        return{
            ...state,
            dislike: state.dislike + 1
        }
    }
}

const votes = JSON.parse(localStorage.getItem('likes&dislikes')) || [];

export default function CapituloCard({capitulo}) {

    const initialVotes = votes.find(vote => vote.id === capitulo.id) || { like: 0, dislike: 0 };
    const [state, dispatch] = useReducer(handlevotes, initialVotes);
    const { theme } = useTheme();

    useEffect(() => {
        saveVotes(state)
    }, [state]);

    return (
        <div className="indiv-capitulo-card" onClick={() => window.location.href=`/episode/${capitulo.id}`}>


            

            <div className="info-capcard">
                <h2 className="titulo-capcard">{capitulo.name}</h2>
                <p className={`info-capcard-titulo-${theme}`}>Season:</p>
                <p className="info-capcard-text">{capitulo.episode}</p>
                <p className={`info-capcard-titulo-${theme}`}>Fecha de season:</p>
                <p className="info-capcard-text">{capitulo.air_date}</p>

                <div className="info-card-btn" onClick={(e) => e.stopPropagation()}>
                    <div className="icon-like">
                        <p>{state.like}</p>
                        <button onClick={() => dispatch({ type: "LIKE"})}>Like</button> {/* Cambiado a "Like" */}
                    </div>
                    <div className="icon-dislike">
                        <p>{state.dislike}</p>
                        <button onClick={() => dispatch({ type: "DISLIKE"})}>Dislike</button> {/* Cambiado a "Dislike" */}
                    </div>
                </div>

            </div>
        </div>
    )
}

function saveVotes(state) {
    votes[votes.findIndex(vote => vote.id === state.id)] = state;
    localStorage.setItem('likes&dislikes', JSON.stringify(votes));
}