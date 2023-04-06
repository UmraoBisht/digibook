import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes);


    //Get All Note
    const getNotes = async () => {
        // API Call : To-do  
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('AuthToken')
            },
        });
        const json = await response.json();
        setNotes(json)
        // console.log(json);
    }

    //Add Note
    // BackEnd add Note

    const addNote = async (title, description, tag) => {
        // API Call : To-do  
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('AuthToken')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        // console.log(json);

        // set State To Update FrontEnd
        setNotes(notes.concat(json));
        showAlert("Note Add Successfully!","success");
    }


    // Remove/Delete Note
    const deleteNote = async (id) => {
        // console.log("Deleting Note...");
        // API Call to delete Note From DB
        // const response = 
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('AuthToken')
            },
        });
        // const json = response.json();
        // console.log(json);

        // Front End Note Deletion
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        showAlert("Note Deleted Successfully!","success");
    }


    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // console.log("Note Editing...");
        // API 
        // const response = 
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('AuthToken')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // const json = response.json();

        let newNotes=JSON.parse(JSON.stringify(notes));//To Make Deep Copy of notes
        // we cant directly change state
        // finding the note to be Edit
        for (let index = 0; index < newNotes.length; index++) {
            const note = notes[index];
            if (note._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        showAlert("Note Update Successfully!","success");
    }

    // showAlert Function Here
    const [alert, setAlert] = useState(null);
    const showAlert=(msg,type)=>{
        setAlert({
            msg:msg,
            type:type
        })
        setTimeout(()=>{
            setAlert(null);
        },4000);
    }

    return (
        // providing contex(states/functions) to children
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,showAlert,alert}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;