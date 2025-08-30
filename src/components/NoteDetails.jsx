import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import calendarLogo from "../assets/calendarLogo.svg";
import tagLogo from "../assets/tagLogo.svg";
import Loader from "./Loader";

function NoteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, handleDeleteDoc, loading } = useContext(noteContext);

    const note = notes.find((n) => n._id === id);

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

                        <div
                            className="p-4 shadow rounded bg-white"
                            style={{ maxWidth: "700px", margin: "0 auto" }}
                        >
                            {/* Title */}
                            <h2 className="fw-bold mb-3">{note.title}</h2>

                            {/* Tag Editing */}
                            {note.tag && (
                                <div className="d-flex align-items-center gap-1 text-muted mb-2">
                                    <img src={tagLogo} alt="tag" height={16} />
                                    <span>{note.tag}</span>
                                </div>
                            )}

                            {/* Document Editing */}
                            {note.image && (
                                <div className="my-3 text-center">
                                    {note.image.includes("/image/") ? (
                                        <a href={note.image} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={note.image}
                                                alt="Uploaded"
                                                className="img-fluid rounded"
                                                style={{ maxHeight: "300px", objectFit: "cover" }}
                                            />
                                        </a>
                                    ) : (
                                        <a
                                            href={`https://docs.google.com/gview?url=${encodeURIComponent(note.image)}&embedded=true`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: "inline-block", border: "none", width: "100%" }}
                                        >
                                            <iframe
                                                src={`https://docs.google.com/gview?url=${encodeURIComponent(note.image)}&embedded=true`}
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    border: "none",
                                                    overflow: "hidden",
                                                    pointerEvents: "none"
                                                }}
                                                title="PDF Preview"
                                            />
                                        </a>
                                    )}
                                    <div className="my-3">
                                        <span>Delete existing document?</span>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => handleDeleteDoc(note._id)}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            )}


                            {/* Description */}
                            <p className="fs-5 lh-lg" style={{ whiteSpace: "pre-line" }}>{note.description}</p>

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate("/")}
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => { navigate(`/editNote/${note._id}`) }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                    </div>
            }
        </>
    );
}

export default NoteDetails;
