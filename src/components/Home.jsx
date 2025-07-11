import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'
import Alert from './Alert'

const Home = () => {
  const context = useContext(noteContext)
  const { notes, setTitle, setDescription, setTag, handleSubmit, isAlert, setIsAlert, alertMessage, alertColor, allTags, setShowTag, setImage, image } = context
  const [searcgTag, setSearcgTag] = useState(null)

  const handleFileChange = async (e) => {
    await setImage(e.target.files[0]);
  };
  return (
    <>
      {isAlert && <div className='position-fixed z-3' style={{ width: "100%" }}><Alert color={alertColor} setIsAlert={setIsAlert} alertMessage={alertMessage} /></div>}

      <div className="d-flex " style={{ width: "auto" }}>

        {/* Main Content */}
        <div style={{ width: "100%" }}>

          <div className="container my-4 d-flex justify-content-center">
                    <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '600px' }}>
                      <div className="card-header text-white py-2 px-3 bg-black bg-gradient" >
                        <h4 className="mb-0 fw-semibold text-center">Add a Note</h4>
                      </div>
                      <div className="card-body px-3 py-3 bg-white">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="noteTitle"
                              placeholder="Note Title"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="noteTitle">Note Title</label>
                          </div>

                          <div className="form-floating mb-3">
                            <textarea
                              className="form-control"
                              id="noteDescription"
                              placeholder="Note Description"
                              style={{ height: '100px' }}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="noteDescription">Note Description</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="noteTag"
                              placeholder="Note Tag"
                              onChange={(e) => setTag(e.target.value)}
                            />
                            <label htmlFor="noteTag">Note Tag</label>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="image" className="form-label">Upload Image (Optional)</label>
                            <input
                              type="file"
                              className="form-control"
                              id="image"
                              name="image"
                              onChange={async (e) => {
                                await setImage(e.target.files[0]);
                              }}
                            />
                          </div>

                          <div className="text-end">
                            <button type="submit" className="btn btn-primary px-4 rounded-pill">Submit</button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>


          <Notes />
        </div>

        {/* Sidebar */}

        <button
          className="btn btn-primary bg-gradient shadow rounded-circle d-flex align-items-center justify-content-center"
          type="button"
          style={{
            position: "fixed",
            right: "20px",
            width: "48px",
            height: "48px",
            fontSize: "20px",
          }}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          title="Filter by Tag"
          id="offcanvasToggleBtn"
        >
          🔍
        </button>


      </div>
      <div className="offcanvas offcanvas-end bg-body-secondary p-0" style={{ maxWidth: "300px" }} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header w-100">
          <div className=' border-bottom border-3 mr-0' style={{ width: "95%" }}>
            <ul className='list-group' style={{ userSelect: "none" }}>
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
          <button type="button" className="btn-close text-reset mb-0 p-0" style={{ userSelect: "none" }} data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column align-items-start">
            <nav
              className="bg-body-secondary  position-sticky"
              id="sidebar"
            >
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
              <ul className="list-group" style={{ userSelect: "none" }}>
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
      </div>

    </>
  )
}

export default Home
