import '../styles/home.css'
import comida from '../img/Em Hamburgo PNG , Clitóris Do Hambúrguer, Hamburger, Ocidental PNG Imagem para download gratuito.jpeg'
import { GiChefToque } from 'react-icons/gi'
import { useEffect } from 'react';
import { useState } from 'react';
import FichaCategoria from '../components/ficha-categoria';
import FichaReceta from '../components/ficha-receta';
import { FiSearch } from 'react-icons/fi'

export default function Home() {

  const [categories, setCategories] = useState([]);
  const [categorieSelected, setCategorieSelected] = useState(getLastCategory());
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState(null);
  const [filteredPlatillos, setFilteredPlatillos] = useState([]);
  const [sortValue, setSortValue] = useState("asc");


  // Al cargar la página, se obtienen las categorías
  useEffect(() =>{
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    }

    fetchCategories()
    
  }, [])


  // Cuando se selecciona una categoría, se obtienen los platillos de esa categoría
  useEffect(() => {
    const fetchPlatillos = async () =>{
      const data = await getPlatillosByCategory(categorieSelected);
      setPlatillos(data);
      setLoading(false);
    }

    fetchPlatillos()
    localStorage.setItem('lastCategory', categorieSelected);
  }, [categorieSelected])
  

  // Cuando se escribe una palabra, se filtran los platillos
  useEffect(() => {
    const hasWord = word !== null && word !== undefined;
    
    if(!hasWord || word.trim() === "") {setFilteredPlatillos(sortPlatillos(platillos, sortValue)); return;}

    const searchWords = word.split(" ");

    const results = platillos.filter((item) => {
      const searchableText = `${item.strMeal || ""}`.toLowerCase();
      return searchWords.every((word) => searchableText.includes(word));
    });

    setFilteredPlatillos(sortPlatillos(results, sortValue));
    
  }, [word, platillos]);

  // Cuando se selecciona un valor de ordenamiento, se ordenan los platillos
  useEffect(() => {
    const sortedPlatillos = sortPlatillos([...filteredPlatillos], sortValue);
    setFilteredPlatillos(sortedPlatillos);
  }, [sortValue]);


    return (
      <div className="base">
        
        {/* Hero title */}
        <div className="hero">
          <div className="left-column">
            <img src={comida} alt="comida" className="comidaa" />
          </div>

          <div className="right-column">
            <div className="logo">
              
            </div>

            <div className="title-row">
              <h1 className="line">Chefs Academy Secrets </h1>
            </div>

            <p className="hero-subtext">
                New recipe for you to try out, let's cook!
            </p>
            
          </div>
        </div>
        
        <div className="content-container">
          {/* CATEGORÍAS */}
          <div className="categorias">
            <h1>Categorías</h1>
            {/* MAPEA LAS CATEGORÍAS */}
            <div className="categories">
              {categories.map((category) => (
                <FichaCategoria 
                  key={category.idCategory} 
                  category={category} 
                  onClick={() => {setCategorieSelected(category.strCategory)}}
                  isSelected={categorieSelected === category.strCategory} 
                />
              ))}
            </div>
          </div>
          
          {/* BASE DE CONTENIDO */}
          <div className="content">
            
            {/* BARRA DE BÚSQUEDA Y SORTBY */}
            <div className="search">
              <div className="search-bar">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search recipies and more..."
                  onChange={(e) => setWord(e.target.value)}
                />
              </div>
              <div className="sortby">
                <select onChange={(e) => setSortValue(e.target.value)}>
                  <option value="asc">Sort by: Asc</option>
                  <option value="desc">Sort by: Desc</option>
                </select>
              </div>
            </div>

            {/* GRID DE PLATILLOS */}
            <div className="platillos">
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                filteredPlatillos.length > 0 ?(
                  filteredPlatillos.map((platillo) => (
                  <div key={platillo.idMeal} className="platillo">
                    <FichaReceta receta={platillo} />
                  </div>
                ))
                ): (
                  <h1>No se encontraron resultados para: {word}</h1>
                )
              )}
            </div>
          </div>

        </div>
      </div>
    );
}

async function getCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  return data.categories;
}

async function getPlatillosByCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
}

function getLastCategory(){
  const getLastCategory = localStorage.getItem('lastCategory') || "Beef";
  console.log(getLastCategory);
  // Si no hay categoría guardada, se asigna "Beef" como valor por defecto
  return getLastCategory;
}

function sortPlatillos(platillos, sortValue) {
  if (sortValue === "asc") {
    return platillos.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sortValue === "desc") {
    return platillos.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }
  return platillos;
}