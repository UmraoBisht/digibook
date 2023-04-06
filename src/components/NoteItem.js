import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import './NoteItem.css';



function NoteItem(props) {
    const { note, updateNote } = props
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleDelete = (id) => {
        deleteNote(id);
    }
    return (
        <>
            <div className='border border-1 col-md-3 mx-2 my-2' >
                <div className="note-card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center my-1">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>{handleDelete(note._id)}} ></i>
                            <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                        </div>
                        <p className="card-text"><b>Description: </b>{note.description}</p>
                        <p className="card-text"><b>Tags: </b>{note.tag}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem