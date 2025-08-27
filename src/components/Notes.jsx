import React from 'react'
import Noteitem from './Noteitem'
import ShowFilters from './ShowFilters'

function Notes() {
    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                <h4 className="fw-bold fs-2 text-primary" style={{fontFamily: 'papyrus'}}>🗂️ My Notes</h4>
            </div>

            <ShowFilters/>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-1">
                <Noteitem />
            </div>
        </div>

    )
}

export default Notes
