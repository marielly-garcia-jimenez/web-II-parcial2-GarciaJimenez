import '../style/login.css'
import MyInput from '../components/Form/MyInput';

export default function Login()
{
    return (
        <div className="loginBackground">
            <div className='degradado'></div>
            <div className='containerLoginBorder'>
                <div className="containerLogin">

                    <h3>Register</h3>
                    <form className="formLogin">
                        <div>
                            <label htmlFor="user">Name</label>
                            <input className='login-input' type="text" placeholder='enter your name' name='user'  />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className='login-input' type="password" placeholder='example@gmail.com' name='email'  />
                        </div>                  
                        <div className='login-button-container'>
                            <button className='login-button' type='submit'>
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        
    )
}