

export default function ProductListItem({title, id, description, images}){
    const image = images?.[0] ?? ""
    return(
        <div>
            <div className="product-list-item" key={id}>
                <div className="product-image">
                    <img src={image} alt="product" />
                </div>
                
                <div className="product-detail">
                    <h4>{description}</h4>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}