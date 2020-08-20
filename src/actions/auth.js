import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, FinishLoading } from './ui';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { noteLogout } from './notes';


// Crearemos nuestra primera acción asincrona
export const startLoginEmailPassword = (email, password )=>{
    // la diferencia es que está función va a recibir un callback   
    return ( dispatch ) =>{
        dispatch( startLoading());
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(                   
                    login(user.uid, user.displayName)
                    );
                dispatch(FinishLoading());
            })
            .catch(e => {
                console.log(e);
                dispatch(FinishLoading());
                Swal.fire('Error', e.message,'error');
            })
       
    }

}

export const startRegisterPasswordWithEmailPasswordName = ( email, password, name) =>{
 // como es una tarea asincrona retornaremos un callback
 return ( dispatch ) =>{
    firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                // actualizamos displayName
                await user.updateProfile({ displayName: name });

                // console.log(user);
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( e =>{
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }        
 }


export const startGoogleLogin = () =>{
    // cuando tenga la información llamaremos ese dispatch
    return ( dispatch )=>{
        // Todo este codigo va retornar una promesa
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) =>{
                dispatch(
                    login(user.uid, user.displayName)
                )    

            })    
    }        

}    

export const login = ( uid, displayName )=> ({
        type: types.login,
        payload:{
            uid,
            displayName
        }    
    });

// es asincrono
export const startLogout = () =>{
    return async( dispatch ) =>{
        await firebase.auth().signOut();
        // una vez se sejecuta estó correctamente
        dispatch( logout() );
        // purgando notas
        dispatch( noteLogout() );
        
    }
}

export const logout = () => ({
    type: types.logout
})



/**
 * Esta acción se llamará cuando tenggamos un uid y un displaName
 * esta accion regresa un objeto que tiene estas espesificaciones
 */