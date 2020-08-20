import React from 'react';
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const {name} = useSelector( state => state.auth );

    const handleLogout = () =>{
        // console.log('click')
        dispatch( startLogout() );
    }

    const handleAddNew = () =>{
        dispatch(startNewNote() );
    }
    return (
        <div>
            <aside className="journal__sidebar">

                <div className="journal__sidebar_navbar">
                    <h3>
                        <i className="far fa-moon"></i>
                        <span> { name }</span>
                    </h3>

                    <button
                        className="btn"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </div>

                <div 
                    className="journal__new_entry"
                    onClick={handleAddNew}
                > 
                    <i className="far fa-calendar-plus fa-5x"></i>
                    <p className="mt-5">
                        New entry
                    </p>
                </div>

                <JournalEntries />

            </aside>
        </div>
    )
}