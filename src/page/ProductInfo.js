import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/ProductInfo.css";

export default function ProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            setProduct(data);
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const maxQuantity = product.stock;
        const selectedQuantity = Math.min(quantity, maxQuantity); // Evita agregar más de lo permitido
        
        const newItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: selectedQuantity,
            total: product.price * selectedQuantity,
            image: product.thumbnail,
        };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Buscar si ya existe el producto en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === newItem.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += selectedQuantity;
            cart[existingProductIndex].total = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
        } else {
            // Regla: No más de 5 productos diferentes
            if (cart.length >= 5) {
                alert("No puedes agregar más de 5 productos diferentes al carrito.");
                return;
            }
            cart.push(newItem);
        }

        // Regla: No superar los $10,000 en total
        const totalCost = cart.reduce((acc, item) => acc + item.total, 0);
        if (totalCost > 10000) {
            alert("No puedes superar los $10,000 en total en el carrito.");
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Producto agregado al carrito");
    };

    if (loading) return <p className="loading-text">Loading product details...</p>;

    return (
        <div className="product-info-container">
            <h2 className="product-info-title">{product.title}</h2>
            <img className="product-info-image" src={product.thumbnail} alt={product.title} />
            <p className="product-info-description">{product.description}</p>
            <p className="product-info-price"><strong>Price:</strong> ${product.price}</p>

            {/* Input para la cantidad */}
            <div className="quantity-container">
                <label htmlFor="quantity">Cantidad:</label>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                />
            </div>

            {/* Botón para agregar al carrito */}
            <button className="add-to-cart-button" onClick={handleAddToCart}>
                Agregar al carrito
            </button>
        </div>
    );
}

