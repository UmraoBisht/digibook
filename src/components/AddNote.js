import React, { useState, useContext } from 'react'
import './AddNote.css';
import noteContext from '../context/notes/NoteContext';

function AddNote() {
    // to use Contex in this "AddNote Component"
    const context = useContext(noteContext);
    // Destructuring context
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "Default" });

    // changing the state state of parent Component from Children using context 
    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        document.getElementById("myform").reset();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <form id='myform' className='container form-box' onSubmit={handleAddNote}>
                <h3 className="form-title my-3">Add Note: </h3>
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-2">
                    <label htmlFor="tag" className="form-label">Tag:</label>
                    <input className="form-control" name="tag" id="tag" onChange={onChange} />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea className="form-control" name="description" id="description" cols="30" rows="5" minLength={5} required onChange={onChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary mx-1 mb-4">Add Note</button>
            </form>
        </>
    )
}

export default AddNote