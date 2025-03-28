import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import { useEffect, useState } from 'react'

export default function Products()
{
    const [products, setProducts] = useState(null)
    const [productId, setProductId] = useState(null)
    const [word, setWord] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data?.products ?? [])
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.length > 3;

        if(!hasWord) return; 
        const fetchProductsByWord = async() => {
            const data = await getProductByWord(word);
            setProducts(data.products)
        }

        fetchProductsByWord()
    }, [word])
    return (
        <div className='products'>
            <div className='products-title'>
                <h2>Our Products</h2>
                <input
                type="text"
                placeholder="Search Product"
                style={{padding: "15px", width: "70%", margin: "auto"}}
                onChange={(e) => setWord(e.target.value)} />
            </div>
            <div className='container-products'>
                {products && products.map((item) =>{
                    return(
                        <ProductItem 
                            title={item.title} 
                            id={item.id} 
                            description={item.description} 
                            images={item.images}
                        />
                    )
                })}
            </div>
        </div>
    )
}

async function getProducts() {
    const products = await fetch("https://dummyjson.com/products");
    return products.json();
}

async function getProductByWord(word) {
    const products = await fetch(`https://dummyjson.com/products/search?q=${word}`)
    return products.json();
}