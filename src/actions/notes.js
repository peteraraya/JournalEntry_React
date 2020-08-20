import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () =>{
    return async( dispatch, getState ) =>{

        const {uid} = getState().auth;
       

        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime()
        }
        // tendra la referencia al documento
        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );

        // console.log(doc)
        dispatch( activeNote( doc.id, newNote ));

        dispatch(addNewNote( doc.id, newNote ));
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


// mostrando nota agregada

export const addNewNote = (id, note) =>({
    type: types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) =>{
    return async( dispatch ) =>{
        // cargo notas en base a ese uid
        const notes = await loadNotes( uid );

        dispatch(setNotes(notes));
    }
}

// Creamos una accion para cargar las notas

export const setNotes = ( notes )=>({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = ( note )=>{

    return async( dispatch, getState )=>{

        const { uid } = getState().auth;
        // se soluciona el error
        if ( !note.url ) {
            delete note.url;
        }

        const noteTofirestore = {...note };

        delete  noteTofirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteTofirestore );

        // dispatch( startLoadingNotes( uid ) ); forma lenta que sirve para la paginación

        dispatch(refreshNote(note.id, noteTofirestore ));

        Swal.fire('Saved', note.title,'success');

        // Swal.close();
    }
}

export const refreshNote = ( id, note) =>({
    type: types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
});

// es una tarea asincrona
export const startUploading = ( file ) =>{
    return async( dispatch, getState )=>{

        const { active:activeNote } = getState().notes;

        
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutSideClick: false,
            onBeforeOpen: () =>{
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload( file );

        // console.log(fileUrl);

        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ));

        Swal.close();

        
        // console.log(file);
        // console.log(activeNote());
    }
}


export const startDeleting = ( id ) =>{
    return async( dispatch, getState ) =>{

        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );


    }
}



export const deleteNote = ( id ) =>({
// sera sincrono porque ya quierp modificar en memeoria
    type: types.notesDelete,
    payload: id

});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})


// getState : es una función para obtener el state : es casi igual que el useSelector