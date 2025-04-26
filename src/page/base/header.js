import MyRoutes from "../../router/router";
import '../../styles/base/header.css'
import { useTheme } from "../../context/context";
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Header() 
{
  const { theme, toggleTheme } = useTheme();

  return (
      <div className="App">
        <header>
          <nav className={`nav-${theme}`}>
            <ul className={`nav-list-${theme}`}>
              <li><NavLink to="/" activeClassName="active">Capitulos</NavLink></li>
              <li><NavLink to="/buscador" activeClassName="active">Buscar</NavLink></li>
              
            </ul>

            
          </nav>          

        </header>

        <MyRoutes />
      </div>
    )
}