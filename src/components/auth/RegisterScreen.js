import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../actions/ui';
import validator from 'validator';
import { startRegisterPasswordWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {


 /**
 *  name: 'Hernando'
 * email: 'nando@dfkjdkjd.com'
 * password:  '12345'
 * password2: '12345'
 * 
 * usaremos useForm
 * 
 * const handleRegister = (e) =>{
 *  console.log(name, email,password,password2 )
 * }
 */

    // necesitaremos nuestro useDispatch para disparar nuestra acción
    const dispatch = useDispatch();

    // useSelector  : para obtener error
    const { msgError } = useSelector( state => state.ui );
    console.log(msgError);

    const [formValues, handleInputChange] = useForm({
        name: 'Hernando',
        email: 'hernando@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(name, email, password, password2);
        if ( isFormValid() ) {
            // console.log('Formulario correcto');
            
            dispatch( startRegisterPasswordWithEmailPasswordName( email,password,name ) );
        }

    }

    // validación del formulario
    const isFormValid = () => {
        // validando
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false;
        } 
        // si esto no es un email
        else if ( !validator.isEmail( email ) ) {
            dispatch(setError('Email is not valid'))
            return false;
        }
        else if ( password !== password2 || password.length < 5 ) {
            dispatch(setError('Password should be at least 6 characters and match each'))
            return false;
        }

        return true;
    }



    return (
        <>
            <h3 className="auth__tittle">Register</h3>
            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
                >

                {
                msgError &&
                (
                    <div className="auth__alert-error ">
                    { msgError}
                    </div>
                 )
                }

                <input
                    autoComplete="off" 
                    className="auth__input"
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={ name }
                    onChange={ handleInputChange}
                    
                />


                <input
                    autoComplete="new-password"
                    className="auth__input"
                    placeholder="Email"
                    name="email"
                    type="text"
                    value={ email }
                    onChange={ handleInputChange}
                />

                <input
                    className="auth__input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={ password }
                    onChange={ handleInputChange}
                />

                <input
                    className="auth__input"
                    placeholder="Confirm password"
                    name="password2"
                    type="password"
                    value={ password2 }
                    onChange={ handleInputChange}
                />

                <button
                    type="submit"
                    className=" btn btn-primary btn-block mb-5"
                    // disabled={true}
                >
                    Register
                </button>


             

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already register?
               </Link>

            </form>
        </>
    )
}
