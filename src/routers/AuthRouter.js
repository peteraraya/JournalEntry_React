import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box_container">
                <Switch>
                    <Route exact path="/auth/login" component={ LoginScreen } />
                    <Route exact path="/auth/register" component={ RegisterScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}




/**
 * Tarea
   Router no lleva Router
   Switch con dos rutas que no llevan exact
                1 :  path="/auth/login" component={ LoginScreen }
                2 :  path="/auth/register" component={ RegisterScreen }
                <Redirect> a to="/auth/login"
             
 * Archivo encargado de tener todas las paginas relacionadas al Auth
 *  tendremos el login y register
 */