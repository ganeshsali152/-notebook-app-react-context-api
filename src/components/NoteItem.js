import React,{useContext} from 'react'
import NoteContext from '../context/NoteContext';

const NoteItem = (props) => {

    const { note, updateNote } = props
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.text}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <i className="fa fa-trash-alt mx-2" onClick={()=>{deleteNote(note.id);
                    props.showAlert("Deleted Successfully", 'success')}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem