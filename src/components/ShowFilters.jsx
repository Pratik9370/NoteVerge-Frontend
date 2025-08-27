import React from 'react'
import { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const ShowFilters = () => {
  const context = useContext(noteContext)
  const { showTag, date, endDate, search, setShowTag, setDate, setEndDate, setSearch } = context
  return (
    <div className='d-flex align-items-center flex-wrap gap-3'>
      <span className="fw-bold">Applied Filters:</span>
      <div className="d-flex flex-wrap gap-1">
        {search && (
          <div className="badge text-dark" style={{ background: "#e3f0ff", color: "#0d6efd" }}>
            <span>Search: {search} </span>
            <button className="badge bg-transparent border-0 text-dark btn btn-primary" onClick={() => { setSearch(null) }}>✕</button>
          </div>
        )}

        {(date && endDate) && (
          <div className="badge text-dark" style={{ background: "#ffeacc", color: "#fd7e14" }}>
            <span>Date range: </span>
            <span>{new Date(date).toLocaleDateString('en-CA').slice(0, 10)}  to  {new Date(endDate).toLocaleDateString('en-CA').slice(0, 10)}</span>
            <button className="badge bg-transparent border-0 text-dark btn btn-primary" onClick={() => { setDate(null), setEndDate(null) }}>✕</button>
          </div>
        )
        }

        {showTag && (
          <div className="badge text-dark" style={{ background: "#ede6ff", color: "#6f42c1" }}>
            <span>Tag: {showTag}</span>
            <button className="badge bg-transparent border-0 text-dark btn btn-primary" onClick={() => { setShowTag(null) }}>✕</button>
          </div>)
        }

        {!search && !date && !showTag && (
          <span className="text-muted">No filters applied</span>
        )}
      </div>
    </div >
  )
}

export default ShowFilters
