import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import deleteLogo from '../assets/delete.svg'
import viewLogo from '../assets/viewLogo.svg'
import Masonry from 'react-masonry-css';
import tagLogo from '../assets/tagLogo.svg'
import calendarLogo from '../assets/calendarLogo.svg'
import './Noteitem.css';

const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    750: 2,
    393: 1
};


function Noteitem() {
    const context = useContext(noteContext)
    const { notes, setNotes, handleDelete, handleSubmit, handleEdit, setTitle, setDescription, showTag, fetchNotes } = context
    const [searchNote, setsSearchNote] = useState(null)
    const [selectedNote, setSelectedNote] = useState({ _id: "", title: "", description: "" });
    const handleEditClick = (note) => {
        setSelectedNote(note);
    };

    return (
        <>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid w-100"
                columnClassName="my-masonry-grid_column"
            >

                {notes.length === 0 && <p className="text-muted">No notes available.</p>}

                {notes.slice().reverse().map((note) => {
                    return (
                        (note.tag == showTag || !showTag) && (
                            <div className="card masonry-card border-0" style={{ maxWidth: "220px", boxShadow: 'rgb(46, 38, 77) 0px 20px 30px -10px'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} key={note._id}>

                                <div className="card-header d-flex justify-content-between align-items-center bg-dark text-light" >
                                    <div >{note.title}</div>
                                    <div className='d-flex justify-content-around gap-2 align-items-center'>
                                        <img height={20} onClick={() => { handleDelete(note._id) }} role='button' src={deleteLogo} alt="delete" />
                                        <img height={20} src={viewLogo} data-bs-toggle="modal" data-bs-target="#exampleModal" alt="" role='button' onClick={() => handleEditClick(note)} />
                                    </div>
                                </div>

                                {note.image && <img src={note.image} className='img-fluid' alt="Uploaded" style={{ width: "100%", height: "100px", objectFit: "cover" }} />}

                                <div className="card-body text-dark">
                                    <p className="card-text">{note.description.length >= 40 ? (<span><span>{note.description.slice(0, 37)}</span> <span>...</span></span>) : note.description}</p>
                                </div>

                                <div className='d-flex justify-content-between text-end m-1 text-black-50' style={{ fontSize: '10px' }}>
                                    <div className='d-flex justify-content-between align-items-center gap-1'><img src={tagLogo} alt="" />{note.tag}</div>
                                    <div><img src={calendarLogo} alt="" />  {note.date.slice(8, 10)}-{note.date.slice(5, 7)}-{note.date.slice(0, 4)}</div>
                                </div>

                            </div>

                        )

                    )
                })
                }
            </Masonry>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">

                            <form onSubmit={async (e) => {
                                e.preventDefault()
                                handleEdit(selectedNote);
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
                                    {selectedNote.image && <img src={selectedNote.image} className='img-fluid' alt="Uploaded" style={{ width: "50%", height: "auto", objectFit: "cover" }} />}
                                </div>

                                <div className="form-group">
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
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Noteitem
