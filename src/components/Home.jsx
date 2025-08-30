import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'
import Alert from './Alert'
import Loader from './Loader'
import Offcanvas from './Offcanvas'

const Home = () => {
  const context = useContext(noteContext)
  const { notes, setTitle, setDescription, setTag, handleSubmit, isAlert, setIsAlert, alertMessage, alertColor, allTags, showTag, setShowTag, setImage, isNoteAdded, loading, date, setDate, endDate, setEndDate, search, setSearch } = context

  const handleFileChange = async (e) => {
    await setImage(e.target.files[0]);
  };
  return (
    <>
      {isAlert && <div className='position-fixed z-3' style={{ width: "100%" }}><Alert color={alertColor} setIsAlert={setIsAlert} alertMessage={alertMessage} /></div>}

      {loading ? <Loader /> :
        <>
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
                        <label htmlFor="image" className="form-label">Upload Attatchment (Optional)</label>
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
                        <button type="submit" className="btn btn-primary px-4 rounded-pill" disabled={isNoteAdded} >Submit</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              <Notes />
            </div>

            {/* Sidebar button */}
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
          
          <Offcanvas />

        </>
      }



    </>
  )
}

export default Home
