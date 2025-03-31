import { useNavigate } from "react-router-dom";
import "../style/products.css";

export default function ProductItem({ title, id, description, images }) {
    const navigate = useNavigate();

    const image = images?.[0] ?? "https://i.pinimg.com/736x/13/85/d6/1385d6e3807933ef7ac3b21f44511058.jpg";

    const handleClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="product-list-item" key={id} onClick={handleClick}>
            <div className="product-list-image">
                <img loading="lazy" src={image} alt="product-image" />
            </div>
            <div className="product-list-details">
                <div className="product-list-container-details">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
