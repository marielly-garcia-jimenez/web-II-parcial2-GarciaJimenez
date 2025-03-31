import { useEffect, useState } from "react";
import "../style/Cart.css";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleClearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
        alert("Carrito vaciado.");
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Carrito </h2>

            {cart.length === 0 ? (
                <p className="cart-empty">Carrito sin productos aun</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.title}</h4>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Costo: ${item.price}</p>
                                    <p><strong>Total:</strong> ${item.total}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="cart-clear-button" onClick={handleClearCart}>
                        Borrar del Carrito
                    </button>
                </>
            )}
        </div>
    );
}
