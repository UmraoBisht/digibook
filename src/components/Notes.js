import React, { useContext, useState, useEffect, useRef } from 'react';
import noteContex from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


function Notes() {
    const context = useContext(noteContex);
    const { notes, getNotes, editNote } = context;
    const nav=useNavigate();

    useEffect(() => {
        if (localStorage.getItem('AuthToken')) {
            getNotes();
        }
        else{
            nav('/login');
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "Default" });
    const ref = useRef(null);


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }


    const handleAddNote = (e) => {
        // e.preventDefault();//on submit of form page reloads
        // console.log("Editing Note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref.current.click();

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container form-box text-dark'>
                                <div className="mb-2">
                                    <label htmlFor="etitle" className="form-label">Title:</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="etag" className="form-label">Tag:</label>
                                    <input className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="edescription" className="form-label">Description:</label>
                                    <textarea className="form-control" name="edescription" id="edescription" cols="30" rows="5" value={note.edescription} minLength={5} required onChange={onChange}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleAddNote}>Update Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <section className='container my-notes-section'>
                <h2 className="form-title">My Notes: </h2>
                {notes.length === 0 && <div className="text-white"> No Notes To Show! 😥</div>}
                <div className="row justify-content-start my-3">
                    {notes.map((note) => {
                        return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                    })}
                </div>
            </section>
        </>
    )
}

export default Notes