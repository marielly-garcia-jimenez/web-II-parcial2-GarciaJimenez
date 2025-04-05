import { Routes, Route } from "react-router-dom"

import Home from '../page/Home'
import About from '../page/About'
import Contact from '../page/Contact'
import Login from "../page/Login"
import ProductInfo from '../page/ProductInfo'
import ProductList from '../page/ProductList'
import CreateProduct from '../page/CreateProduct'
import Cart from "../page/Cart"

export default function MyRouters()
{
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/:id" element={<ProductInfo/>}/>
            <Route path="/Create-Product" element={<CreateProduct/>}/>

            <Route path="/cart" element={<Cart/>}/>
            
        </Routes>
    )
}