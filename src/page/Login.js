import '../style/login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault ();
        const data = {
            username: user,
            password: password,
            expiresInMins: 60
        }

        fetLogIn(data, navigate);
    }

    return (
        <div>
            <div className="containerLogin">
                <h3>Login</h3>
                <form className="formLogin" onSubmit={handleSubmit}>
                    <div>
                        <input className='login-input' type="text" placeholder='User' name='user' onChange={handleUserChange}  />
                    </div>
                    <div>
                        <input className='login-input' type="password" placeholder='Password' name='password' onChnage={handlePasswordChange}  />
                    </div>                  
                    <div className='login-button-container'>
                        <button className='login-button' type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function fetLogIn(data, navigate) {
    fetch('https://dummyjson.com/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response =>{
        const hasNoToken = response?.accessToken === undefined;
        if (hasNoToken){
            alert("Usuario o contraseña incorrectos");
            return;
        }
        localStorage.setItem("token", response.accessToken);
        console.log()
        navigate("/products")
    })
}