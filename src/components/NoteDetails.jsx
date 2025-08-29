import React, { useState } from "react";

function NoteDetails({ note, onClose, onSave }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleSave = () => {
    onSave({ ...note, title, description });
    onClose();
  };

  return (
    <div className="p-4 shadow-lg rounded bg-white">
      <h4>Edit Note</h4>
      <input
        className="form-control my-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control my-2"
        rows="5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default NoteDetails;
