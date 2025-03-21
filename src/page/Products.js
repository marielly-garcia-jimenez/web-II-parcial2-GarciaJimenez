import ProductListItems from "../components/ProductListItem"
export default function Products(){
    return(
        <div className="productsPage">
            <h1 className="title">We release interesting articles about technology</h1>
            <div className="container-products">
                <ProductListItems/>
                <ProductListItems/>
                <ProductListItems/>
            </div>
        </div>
        
    )
}