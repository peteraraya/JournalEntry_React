import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm';
import { activeNote, deleteNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    // referencia a la nota activa
    const {active:note} = useSelector( state => state.notes );
    // console.log(note);
    const  [ formValues, handleInputChange, reset ] =  useForm( note );

    // console.log(formValues);
    const { body, title, id } = formValues;

    // useRef : permite almacenar una variable queno va redibujar el componente
    const activeId = useRef( note.id );

    useEffect(() => {
        // se dispara solo y solo si la nota cambio para evitar el ciclo infinito
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }
    }, [note, reset ])

    useEffect(() => {
        // esto se va a disparar cuando algo cambie

        // tengo que hacer un dispatch para actualizar la nota activa
        dispatch( activeNote( formValues.id, {...formValues} ) );

        console.log(formValues)
       
    }, [formValues,dispatch]) // dependencia de lo que estoy escuchando

    const handleDelete = () =>{
        // se realiza la tarea sincrona de borrar
        dispatch( startDeleting( id ));
    }


    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={ handleInputChange}
                />
                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={ handleInputChange}
                >

                </textarea>

                {
                    (note.url) 
                    
                    &&(<div className="notes__images">
                            <img
                                src={note.url}
                                alt="imagen"
                                className=""
                            >
                            
                            </img>
                        </div>
                        )
                }
            </div>
                <button
                    className="btn btn-danger"
                    onClick={ handleDelete }
                >
                   Delete     
                </button>
        </div>

     
    )
}
