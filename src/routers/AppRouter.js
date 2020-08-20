/**
 * Sistema de rutas de archivos principal
 */

 import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoutes } from './PublicRoutes';

import { JournalScreen } from '../components/journal/JournalScreen';

import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

import { startLoadingNotes } from '../actions/notes';


 export const AppRouter = () => {

    // ejecutaremos un procedimiento cuando nuestra aplicación cambie

    const dispatch = useDispatch();

    // esperar que tenga una respuesta , revisando el estado de firebase
    const [ checking, setcheCking] = useState(true);

     const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        // crearemos un observable, que es un objeto especial que se puede disparar mas de una vez
        firebase.auth().onAuthStateChanged( async(user) =>{
            // console.log(user);
            // si el objeto user tiene algo pregunta el uid
            if (user?.uid) {
                dispatch( login(user.uid, user.displayName));
                setIsLoggedIn( true );
                // const notes = await loadNotes( user.uid );
                // llamamos las notas
                dispatch(startLoadingNotes( user.uid ));

            }else{
                setIsLoggedIn( false );
            }

            // ya termine el checkeo
            setcheCking(false);

        });
    }, [dispatch, setcheCking, setIsLoggedIn ])
    // [] al tener una depencia vacía este efecto se ejecuta una sola vez


    if ( checking ) {
            return (
                <h3>Wait ....</h3>
            )
    }

     return (
         <Router>
             <div>
                {/* Router:
                    La ruta tiene que apuntar al path=/auth
                    No es exacto
                    Y el componente que va apuntar va ser component={ AuthRouter }

                    Main Routes
                    exact
                    path="/"
                    component= { JournalScreen }
                */}
                 <Switch>
                     <PublicRoutes
                         path="/auth"
                         component={ AuthRouter }
                         isAuthenticated={ isLoggedIn }
                     />

                     <PrivateRoute
                         exact
                         isAuthenticated={ isLoggedIn }
                         path="/"
                         component={ JournalScreen }
                     />

                     <Redirect to="/auth/login" />
                 </Switch>
             </div>
         </Router>
     )
 }
 


 // Todo el codigo se muestra de forma sincrona . exceptuando el useEffect