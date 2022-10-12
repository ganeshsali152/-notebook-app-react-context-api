
import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

    const notes_i = []
    const host = "http://127.0.0.1:8000"
    const token = localStorage.getItem('token')
    const [notes, setNotes] = useState(notes_i)

    const getAllNotes = async () => {
        const response = await fetch(`${host}/notes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const res = await response.json();
        setNotes(res);
    }

    const addNote = async (title, text) => {
        // API call
        const response = await fetch(`${host}/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title,text})
        });
        const n_res = await response.json();
        setNotes(notes.concat(n_res));
    }

    const editNote = async (id, title, text) => {
        // API call
        const response = await fetch(`${host}/notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title,text})
        });
        const res = await response.json();
        console.log(res);

        // client side edit
        let newnote = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element.id === id) {
                newnote[i].title = title;
                newnote[i].text = text;
                break;
            }
        }
        setNotes(newnote);
    }

    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const res = response.json();
        console.log(res);
        const new_notes = notes.filter((note) => { return note.id !== id });
        setNotes(new_notes)

    }

    return (
        <NoteContext.Provider value={{ notes, getAllNotes, setNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;