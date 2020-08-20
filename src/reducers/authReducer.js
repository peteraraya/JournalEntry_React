import { types } from "../types/types";
/**
 * {
 *  el state va estar vacio cuando no estemos autenticados
 *  y cuando este autenticado
 *   
 *      uid:sjahjashjsakkashd
 *      name: 'Pedro'
 * }
 * 
 * 
 */

//  const initialState = {
//      uid:123123,
//      name:'Peter',
//      dir:{
//          b:12
//      }
//  }


export const authReducer = (state = {}, action)=>{

    switch (action.type) {
        case types.login:
                return{
                    // retorno un nuevo objeto
                    uid: action.payload.uid,
                    name: action.payload.displayName
                }
        case types.logout:
                // devuelvo mi estado a un estado vacio
                return {}    
    
        default:
            return state;
    }

}