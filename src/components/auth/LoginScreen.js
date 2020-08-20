import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {

    // uso de dispatch
   const dispatch = useDispatch();

    // uso de useSelector
   const {loading} = useSelector( state => state.ui );

//    console.log(loading)

    const [ formValues, handleInputChange ] = useForm({
        email: 'piteraraya@gmail.com',
        password:'123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        //  console.log(email,password);
        // dispatch(startLoginEmailPassword(123456789, 'Laly') );
        dispatch(startLoginEmailPassword(email,password));
    }

    // Utilizando accion de credenciales de google
    const handleGoogleLogin = () =>{
        dispatch( (startGoogleLogin() ) );
    }
    
    return (
        <>
          <h3 className="auth__tittle">Login</h3>
          <form 
                onSubmit={ handleLogin }
                className="animate__animated animate__fadeIn animate__faster"    
            >
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"    
                    autoComplete="off" 
                    value={ email } 
                    onChange ={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input" 
                    value={ password } 
                    onChange ={ handleInputChange }
                />
                
                <button
                    type="submit"
                    className=" btn btn-primary btn-block"    
                    disabled={ loading }  
                >brave
                    Login
                </button>

    
               <div className="auth__social_networks">
                   <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
               </div>

               <Link 
                    to="/auth/register"
                    className="link"
                    >
                    Create new account
               </Link>

         </form>  
        </>
    )
}
