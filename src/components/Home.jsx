import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'
import Alert from './Alert'

const Home = () => {
  const context = useContext(noteContext)
  const { notes, setTitle, setDescription, setTag, handleSubmit, isAlert, setIsAlert, alertMessage, alertColor, allTags, setShowTag, setFile} = context
  const [searcgTag, setSearcgTag] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      {isAlert && <div className='position-fixed z-3' style={{ width: "100%" }}><Alert color={alertColor} setIsAlert={setIsAlert} alertMessage={alertMessage} /></div>}

      <div className="d-flex justify-content-between position-relative">
        {/* Main Content */}
        <div className="w-75">
          <div className="container my-4 lh-lg">
            <h2>Add a note</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="noteTitle">Note title</label>
                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} id="noteTitle" placeholder="Enter title" />
              </div>
              <div className="form-group">
                <label htmlFor="noteDescription">Note Description</label>
                <textarea type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} id="noteDescription" placeholder="Description" />
              </div>
              <div className="form-group">
                <label htmlFor="noteTag">Note Tag</label>
                <input type="text" className="form-control" onChange={(e) => setTag(e.target.value)} id="noteTag" placeholder="Tag" />
              </div>
              <div>
                <input type="file" onChange={handleFileChange}/>
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
          <Notes />
        </div>

        {/* Sidebar */}
        <div className="d-flex flex-column align-items-start height-100">
          <nav
            className="bg-body-secondary shadow-sm border-end p-3 position-sticky"
            id="sidebar"
            style={{ width: "250px", borderRight: "3px solid #ddd", borderRadius: "0 10px 10px 0", top: "20px", height: "calc(100vh - 20px)" }}
          >
            <div className=' border-bottom border-3'>
              <ul className='list-group'>
                <li
                  className="list-group-item border-0 shadow-sm mb-2 tag-item"
                  style={{ borderRadius: "8px", transition: "all 0.2s ease-in-out", cursor: "pointer" }}
                  role="button"
                  onClick={() => setShowTag(null)} // or any value that represents "All Notes"
                >
                  📂 All Notes
                </li>
              </ul>
            </div>
            <h5 className="mb-3 text-primary fw-bold">📌 Tags</h5>

            <form className="form-inline mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-start"
                  onChange={(e) => { setSearcgTag(e.target.value) }}
                  placeholder="Search Tag..."
                  aria-label="Search Tag"
                  aria-describedby="basic-addon1"
                />
                <span className="input-group-text bg-primary text-white rounded-end" id="basic-addon1">
                  🔍
                </span>
              </div>
            </form>

            {/* Tags List */}
            <ul className="list-group">
              {/* Show All Notes Option */}

              {allTags.map((tag, index) => (
                searcgTag ? (
                  tag.slice().includes(searcgTag) && (
                    <li
                      key={index}
                      className="list-group-item border-0 shadow-sm mb-2 tag-item"
                      style={{ borderRadius: "8px", transition: "all 0.2s ease-in-out", cursor: "pointer" }}
                      role="button"
                      onClick={() => setShowTag(tag)}
                    >
                      🏷️ {tag}
                    </li>
                  )
                ) : (
                  <li
                    key={index}
                    className="list-group-item border-0 shadow-sm mb-2 tag-item"
                    style={{ borderRadius: "8px", transition: "all 0.2s ease-in-out", cursor: "pointer" }}
                    role="button"
                    onClick={() => setShowTag(tag)}
                  >
                    🏷️ {tag}
                  </li>
                )
              ))}
            </ul>
          </nav>
        </div>


      </div>
    </>
  )
}

export default Home
