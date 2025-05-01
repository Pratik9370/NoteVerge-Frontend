import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import deleteLogo from '../assets/delete.svg'
import viewLogo from '../assets/viewLogo.svg'

function Noteitem() {
    const context = useContext(noteContext)
    const { notes, setNotes, handleDelete, handleSubmit, handleEdit, setTitle, setDescription, showTag } = context
    const [searchNote, setsSearchNote] = useState(null)
    const [selectedNote, setSelectedNote] = useState({ _id: "", title: "", description: "" });
    const handleEditClick = (note) => {
        setSelectedNote(note);
    };

    return (
        <>

            <div className='d-flex gap-2 flex-wrap'>

                {notes.slice().reverse().map((note) => {
                    return (
                        !showTag ? (
                            <div className="card mb-3" style={{ width: "220px" }} key={note._id}>
                                <div className="card-header d-flex justify-content-between align-items-center bg-dark text-light" >
                                    <div >{note.title}</div>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-body">

                                                    <form onSubmit={(e) => {
                                                        handleEdit(note._id);
                                                    }}>
                                                        <div className="modal-header">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control border-0 ps-0 bg-transparent fs-2 fw-bold"
                                                                    onChange={(e) => setSelectedNote((prevNote) => ({ ...prevNote, title: e.target.value }))}
                                                                    placeholder="Enter title"
                                                                    value={selectedNote.title}
                                                                />
                                                            </div>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>

                                                        <div className='d-flex justify-content-center'>
                                                        {note.image && <img src={`http://localhost:3000${selectedNote.image}`} className='img-fluid' alt="Uploaded" style={{ width: "50%", height: "auto", objectFit: "cover" }} />}
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="noteDescription">Note Description</label>
                                                            <textarea
                                                                className="form-control border-0 bg-transparent fw-semibold"
                                                                rows="4"
                                                                onChange={(e) => setSelectedNote((prevNote) => ({ ...prevNote, description: e.target.value }))}
                                                                placeholder="Description"
                                                                value={selectedNote.description}>
                                                            </textarea>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" className="btn btn-primary" onClick={() => { setTitle(selectedNote.title); setDescription(selectedNote.description); }}>
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex justify-content-around gap-2 align-items-center'>
                                        <img height={20} onClick={() => { handleDelete(note._id) }} role='button' src={deleteLogo} alt="delete" />
                                        <img height={20} src={viewLogo} data-bs-toggle="modal" data-bs-target="#exampleModal" alt="" onClick={() => handleEditClick(note)} />
                                    </div>
                                </div>
                                {note.image && <img src={`http://localhost:3000${note.image}`} className='img-fluid' alt="Uploaded" style={{ width: "100%", height: "100px", objectFit: "cover" }} />}
                                <div className="card-body text-dark">
                                    <p className="card-text">{note.description.length >= 40 ? (<span><span>{note.description.slice(0, 37)}</span> <span>...</span></span>) : note.description}</p>
                                </div>
                                <div className='d-flex justify-content-between text-end m-1 text-black-50' style={{ fontSize: '10px' }}>
                                    <div>{note.tag}</div>
                                    <div>{note.date.slice(11, 16)}    {note.date.slice(8, 10)}-{note.date.slice(5, 7)}-{note.date.slice(0, 4)}</div>
                                </div>
                            </div>
                        ) : (
                            note.tag == showTag && (
                                <div className="card mb-3" style={{ width: "220px" }} key={note._id}>
                                    <div className="card-header d-flex justify-content-between align-items-center bg-dark text-light" >
                                        <div >{note.title}</div>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-body">

                                                        <form onSubmit={(e) => {
                                                            handleEdit(note._id);
                                                        }}>
                                                            <div className="modal-header">
                                                                <div className="form-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-0 ps-0 bg-transparent fs-2 fw-bold"
                                                                        onChange={(e) => setSelectedNote((prevNote) => ({ ...prevNote, title: e.target.value }))}
                                                                        placeholder="Enter title"
                                                                        value={selectedNote.title}
                                                                    />
                                                                </div>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>


                                                            <div className="form-group">
                                                                <label htmlFor="noteDescription">Note Description</label>
                                                                <textarea
                                                                    className="form-control border-0 bg-transparent fw-semibold"
                                                                    rows="4"
                                                                    onChange={(e) => setSelectedNote((prevNote) => ({ ...prevNote, description: e.target.value }))}
                                                                    placeholder="Description"
                                                                    value={selectedNote.description}>
                                                                </textarea>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary" onClick={() => { setTitle(selectedNote.title); setDescription(selectedNote.description); }}>
                                                                    Save Changes
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-around gap-2 align-items-center'>
                                            <img height={20} onClick={() => { handleDelete(note._id) }} role='button' src={deleteLogo} alt="delete" />
                                            <img height={20} src={viewLogo} data-bs-toggle="modal" data-bs-target="#exampleModal" alt="" onClick={() => handleEditClick(note)} />
                                        </div>
                                    </div>
                                    {note.image && <img src={`http://localhost:3000${note.image}`} className='img-fluid' alt="Uploaded" style={{ width: "100%", height: "100px", objectFit: "cover" }} />}
                                    <div className="card-body text-dark">
                                        <p className="card-text">{note.description.length >= 40 ? (<span><span>{note.description.slice(0, 37)}</span> <span>...</span></span>) : note.description}</p>
                                    </div>
                                    <div className='d-flex justify-content-between text-end m-1 text-black-50' style={{ fontSize: '10px' }}>
                                        <div>{note.tag}</div>
                                        <div>{note.date.slice(11, 16)}    {note.date.slice(8, 10)}-{note.date.slice(5, 7)}-{note.date.slice(0, 4)}</div>
                                    </div>
                                </div>
                            )
                        )
                    )
                })
                }
            </div>
        </>
    )
}

export default Noteitem
