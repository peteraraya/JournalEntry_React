import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';


export const PrivateRoute = ({
    // enviaremos property

    isAuthenticated,
    component: Component,
    ...rest
}) => {

    // console.log(isAuthenticated )
    return (
        // Devuelvo una ruta
        <Route {...rest}
            component={(props) => (
                // regreso esto de manera condicional
                (isAuthenticated)
                    ? (<Component {...props} />) // si está autenticado
                    : (<Redirect to="/auth/login" />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}



/**
 * Este funcional componente tendrá un comportamiento especial
 */