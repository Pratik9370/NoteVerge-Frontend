import React from 'react';

const About = () => {
  return (
    <div className="container py-5 px-3">
      <div className="card shadow border-0">
        <div
          className="card-header text-white"
          style={{
            background: 'linear-gradient(to right, #000000, #2c3e50)',
            borderBottom: 'none',
          }}
        >
          <h2 className="text-center fw-bold mb-0">📚 About NoteVerge</h2>
        </div>
        <div className="card-body bg-light">
          <p className="lead">
            <strong>NoteVerge</strong> is your personal, secure digital notebook built to help you organize thoughts, tasks, and information with ease. Designed for simplicity and speed, it gives you full control over your notes — anytime, anywhere.
          </p>

          <hr />

          <h5 className="fw-bold mb-2">✨ Key Features</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">📝 Add and edit notes with title, description, and tags</li>
            <li className="list-group-item">🔍 Filter notes by tags for quick access</li>
            <li className="list-group-item">📂 Upload optional images with each note</li>
            <li className="list-group-item">🌙 Clean and responsive UI</li>
            <li className="list-group-item">💾 All notes stored securely within Database</li>
          </ul>

          <hr />

          <p className="mt-3">
            Whether you're jotting down quick thoughts or managing your daily tasks, <strong>NoteVerge</strong> helps you stay organized with a user-friendly and powerful interface.
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;
