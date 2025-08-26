import React, { useState, useRef, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

function DateFilter() {
  const context = useContext(noteContext)
  const { date, setDate, endDate, setEndDate } = context
  const fpRef = useRef(null);

  return (

    <>
      <Flatpickr
        ref={fpRef}
        options={{
          mode: "range",
          dateFormat: "Y-m-d",
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
    </>


  );
}

export default DateFilter;
