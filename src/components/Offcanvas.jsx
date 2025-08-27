import React from 'react'
import { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext'
import "flatpickr/dist/themes/material_blue.css";
import DateFilter from './DateFilter';
import ShowFilters from './ShowFilters';

function Offcanvas() {
  const context = useContext(noteContext)
  const { allTags, showTag, setShowTag, date, setDate, endDate, setEndDate, search, setSearch } = context
  const [searcgTag, setSearcgTag] = useState(null)
  return (
    <div
      className="offcanvas offcanvas-end shadow-lg"
      style={{
        maxWidth: "340px",
        background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
      }}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      {/* Header */}
      <div className="offcanvas-header sticky-top bg-white border-bottom pb-2 shadow-sm">
        <h5 className="fw-bold text-primary mb-0">⚙️ Filters</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      {/* Body */}
      <div className="offcanvas-body p-3">

        {/* Clear Filters */}
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn px-4 py-2 rounded-pill fw-semibold text-white shadow-sm"
            style={{
              background: "linear-gradient(135deg, #dc3545, #ff6b6b)",
              transition: "all 0.2s ease-in-out",
            }}
            onClick={() => {
              setShowTag(null);
              setDate(null);
              setEndDate(null);
              setSearch("");
              setSearcgTag("");
            }}
          >
            📂 Clear All Filters
          </button>
        </div>

        {/* Accordion */}
        <div className="accordion" id="filterAccordion">

          {/* 🔍 Search Notes */}
          <div
            className="accordion-item border-0 shadow-sm mb-4 rounded-3 overflow-hidden"
            style={{ background: "#f0f7ff" }} // whole block bg
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button fw-semibold collapsed text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSearch"
                style={{ background: "#e3f0ff", color: "#0d6efd" }} // header bg slightly darker
              >
                🔍 Search Notes
              </button>
            </h2>
            <div
              id="collapseSearch"
              className="accordion-collapse collapse"
              data-bs-parent="#filterAccordion"
            >
              <div className="accordion-body">
                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                  <input
                    type="search"
                    className="form-control border-0"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title or description..."
                  />
                  <span className="input-group-text bg-primary text-white">🔍</span>
                </div>
              </div>
            </div>
          </div>

          {/* 📅 Select Date Range */}
          <DateFilter/>

          {/* 🏷️ Filter by Tags */}
          <div
            className="accordion-item border-0 shadow-sm mb-4 rounded-3 overflow-hidden"
            style={{ background: "#f5f0ff" }} // whole block bg
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button fw-semibold collapsed text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTags"
                style={{ background: "#ede6ff", color: "#6f42c1" }} // header bg slightly darker
              >
                🏷️ Filter by Tags
              </button>
            </h2>
            <div
              id="collapseTags"
              className="accordion-collapse collapse"
              data-bs-parent="#filterAccordion"
            >
              <div className="accordion-body">
                <div className="input-group shadow-sm rounded-pill overflow-hidden mb-3">
                  <input
                    type="search"
                    className="form-control border-0"
                    onChange={(e) => setSearcgTag(e.target.value)}
                    placeholder="Search for Tag..."
                  />
                  <span className="input-group-text bg-primary text-white">🔍</span>
                </div>

                <ul
                  className="list-group"
                  style={{
                    userSelect: "none",
                    maxHeight: "180px",
                    overflowY: "auto",
                    borderRadius: "12px",
                  }}
                >
                  {allTags.map((tag, index) =>
                    searcgTag ? (
                      tag.toLowerCase().includes(searcgTag.toLowerCase()) && (
                        <li
                          key={index}
                          className="list-group-item border-0 shadow-sm mb-2 tag-item"
                          style={{
                            borderRadius: "10px",
                            transition: "all 0.2s ease-in-out",
                            cursor: "pointer",
                          }}
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
                        style={{
                          borderRadius: "10px",
                          transition: "all 0.2s ease-in-out",
                          cursor: "pointer",
                        }}
                        role="button"
                        onClick={() => setShowTag(tag)}
                      >
                        🏷️ {tag}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="offcanvas-footer border-top p-3 bg-light">
        <ShowFilters/>
      </div>
    </div>
  )
}

export default Offcanvas
