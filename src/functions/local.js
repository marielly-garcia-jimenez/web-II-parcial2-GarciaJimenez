import "../styles/location.css";
import { FaHome, FaUserFriends, FaStar } from "react-icons/fa";

export default function LocationCard({ location }) {
    return (
      <div className="card">
        <div className="card-image">
          <img src={location.image} alt={location.title} className="card-img" />
          {location.superhost ? <span className="super-host">Superhost <FaStar /></span> : null}
        </div>
        <div className="card-content">
          <h3>{location.title}</h3>
          <p>{location.description}</p>
          <div className="card-capacity">
            <span className="card-bedroom"><FaHome /> {location.capacity.bedroom} Bedroom</span>
            <span className="card-people"><FaUserFriends /> {location.capacity.people} Guest</span>
          </div>
          <hr></hr>
          <div className="card-price">
            <span className="price">${location.price}/night</span>
            <span className="rating"><FaStar /> {location.rating}</span>
          </div>
        </div>
      </div>
    );
  }