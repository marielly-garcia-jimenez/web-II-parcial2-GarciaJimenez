import { useNavigate } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';

export default function Products() {
    const [products, setProducts] = useState(null);
    const [word, setWord] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts();
            setProducts(data?.products ?? []);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const hasWord = word && word.length > 3;
        if (!hasWord) return;

        const fetchProductsByWord = async () => {
            setLoading(true);
            const data = await getProductByWord(word);
            setProducts(data.products);
            setLoading(false);
        };

        fetchProductsByWord();
    }, [word]);

    return (
        <div className='products'>
            <div className='products-title'>
                <h2>Our Products</h2>
                <input
                    type="text"
                    placeholder="Search Product"
                    style={{ padding: "15px", width: "70%", margin: "auto" }}
                    onChange={(e) => setWord(e.target.value)}
                />
            </div>

            {loading && <p>Loading...</p>}
            {!loading && products?.length === 0 && <p>No products found.</p>}

            <div className='container-products'>
                {products && products.map((item) => (
                    <ProductItem 
                        key={item.id}
                        title={item.title} 
                        id={item.id} 
                        description={item.description} 
                        images={item.images}
                    />
                ))}
            </div>
        </div>
    );
}

async function getProducts() {
    const products = await fetch("https://dummyjson.com/products");
    return products.json();
}

async function getProductByWord(word) {
    const products = await fetch(`https://dummyjson.com/products/search?q=${word}`);
    return products.json();
}
