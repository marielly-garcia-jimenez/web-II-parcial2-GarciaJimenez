import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/recepie.css";

export default function Recepie() {
    const { id } = useParams();
    const [recepie, setRecepie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchRecepie = async () => {
            const data = await getRecepie(id);
            setRecepie(data[0]);

            const stored = JSON.parse(localStorage.getItem("IngredientsByRecepie")) || {};
            if (stored[id]) {
                setIngredients(stored[id]);
            } else {
                const allIngredients = [];
                for (let i = 1; i <= 20; i++) {
                    const name = data[0][`strIngredient${i}`];
                    const measure = data[0][`strMeasure${i}`];
                    if (name && name.trim()) {
                        allIngredients.push({ name, measure });
                    }
                }
                setIngredients(allIngredients);
                localStorage.setItem("IngredientsByRecepie", JSON.stringify({
                    ...stored,
                    [id]: allIngredients
                }));
            }
            setLoading(false);
        };
        fetchRecepie();
    }, [id]);

    const eliminarIngrediente = (index) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated);

        const stored = JSON.parse(localStorage.getItem("IngredientsByRecepie")) || {};
        stored[id] = updated;
        localStorage.setItem("IngredientsByRecepie", JSON.stringify(stored));
    };

    const restaurarIngredientes = () => {
        if (!recepie) return;
        const restored = [];
        for (let i = 1; i <= 20; i++) {
            const name = recepie[`strIngredient${i}`];
            const measure = recepie[`strMeasure${i}`];
            if (name && name.trim()) {
                restored.push({ name, measure });
            }
        }
        setIngredients(restored);
        const stored = JSON.parse(localStorage.getItem("IngredientsByRecepie")) || {};
        stored[id] = restored;
        localStorage.setItem("IngredientsByRecepie", JSON.stringify(stored));
    };

    return (
        <div className="base-recepie">
            {loading ? (
                <div className="loading">
                    <h1>Cargando</h1>
                </div>
            ) : (
                <div className="recepie-container">
                    <div className="recepie-header">
                        <img src={recepie.strMealThumb} alt={recepie.strMeal} className="meal-image" />
                        <div className="recepie-info">
                            <h1>{recepie.strMeal}</h1>
                            <h3>{recepie.strArea} — {recepie.strCategory}</h3>
                            <p className="meal-id">ID: {recepie.idMeal}</p>
                        </div>
                    </div>

                    <div className="content-columns">
                        <div className="video">
                            {recepie.strYoutube && (
                                <div className="video-wrapper">
                                    <iframe
                                        src={recepie.strYoutube.replace("watch?v=", "embed/")}
                                        title="YouTube video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>

                        <div className="instructions-ingredients">
                            <div className="card instructions">
                                <h2>~Instrucciones~</h2>
                                <p>{recepie.strInstructions}</p>
                            </div>

                            <div className="card ingredients">
                                <div className="ingredients-header">
                                    <h2>~Ingredientes~</h2>
                                    <button onClick={restaurarIngredientes} className="restaurar-btn">Regresar</button>
                                </div>
                                <div className="ingredients-list">
                                    {ingredients.map((ing, i) => (
                                        <div key={i} className="ingredient-card">
                                            <span>{ing.name}</span>
                                            <small className="ingredient-info">{ing.measure}</small>
                                            <button onClick={() => eliminarIngrediente(i)} className="delete-btn">Eliminar</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

async function getRecepie(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals;
}
