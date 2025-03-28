import '../style/products.css'
export default function ProductItem()
{
    return (
        <div className="product-list-item">
            <div className="product-image">
                <img src="https://i.pinimg.com/736x/13/85/d6/1385d6e3807933ef7ac3b21f44511058.jpg"></img>
            </div>
            <div className="product-details">
                <div className="container-products">
                    <h4>yoshi</h4>
                    <p>Novembre 12, 2024</p>
                </div>
            </div>
        </div>
    )
}