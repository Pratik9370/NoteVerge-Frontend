import React, { useState, useRef, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import calendarLogo from "../assets/calendarLogo.svg"


function DateFilter() {
  const context = useContext(noteContext)
  const { date, setDate, endDate, setEndDate } = context
  const fpRef = useRef(null);

  return (

    <>

      {/* 📅 Select Date Range */}
      <div
        className="accordion-item border-0 shadow-sm mb-4 rounded-3 overflow-hidden"
        style={{ background: "#fff7e6" }} // whole block bg
      >
        <h2 className="accordion-header">
          <button
            className="accordion-button fw-semibold collapsed text-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDate"
            style={{ background: "#ffeacc", color: "#fd7e14" }} // header bg slightly darker
          >
            📅 Filter by Date Range
          </button>
        </h2>
        <div
          id="collapseDate"
          className="accordion-collapse collapse"
          data-bs-parent="#filterAccordion"
        >
          <div className="accordion-body d-flex flex-column gap-3">
            <div className="input-group shadow-sm rounded-pill overflow-hidden">
              <span className="input-group-text bg-light border-0">
                <img src={calendarLogo} alt="" style={{ width: "18px", height: "18px" }} />
              </span>
              <Flatpickr
                ref={fpRef}
                options={{
                  mode: "range",
                  dateFormat: "d-m-Y",
                  // disable default close behavior
                  clickOpens: true,
                  closeOnSelect: false,
                  onChange: (selectedDates) => {
                    if (selectedDates.length === 1) {
                      setDate(selectedDates[0]);
                      setEndDate(null);
                      // reopen so user can pick the second date
                      setTimeout(() => {
                        if (fpRef.current && fpRef.current.flatpickr) {
                          fpRef.current.flatpickr.open();
                        }
                      }, 0);
                    } else if (selectedDates.length === 2) {
                      setDate(selectedDates[0]);
                      setEndDate(selectedDates[1]);
                    } else {
                      setDate(null);
                      setEndDate(null);
                    }
                  },
                }}
                value={date && endDate ? [date, endDate] : date ? [date] : []}
                className="form-control"
                placeholder="Select Date Range"
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default DateFilter;
