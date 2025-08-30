import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Loader from "./Loader";

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, handleEdit, loading } = useContext(noteContext);

    const note = notes.find((n) => n._id === id);

    // Local state for form
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setTag(note.tag);
            setDescription(note.description);
            setImage(note.image || null);
        }
    }, [note]);

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedNote = {
            ...note,
            title,
            tag,
            description,
            image,
        };
        await handleEdit(updatedNote);
        navigate(`/note/${note._id}`);
    };

    if (!note) {
        return (
            <div className="container my-5">
                <p className="text-muted">Note not found</p>
            </div>
        );
    }

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="container my-5">
                        <form onSubmit={handleSave} encType="multipart/form-data">
                            <div
                                className="p-4 shadow rounded bg-white"
                                style={{ maxWidth: "700px", margin: "0 auto" }}
                            >
                                <input
                                    type="text"
                                    className="form-control border-0 fs-2 fw-bold mb-3"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    placeholder="Enter tag"
                                />
                                
                                <div className="my-3">
                                    <label className="form-label fw-semibold">Upload Document (this will replace the existing one, if any)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*,.pdf"
                                        name="image"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <textarea
                                    className="form-control my-3"
                                    rows="6"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-dark"
                                        onClick={() => navigate(`/note/${note._id}`)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
            }
        </>
    );
};

export default EditNote;
