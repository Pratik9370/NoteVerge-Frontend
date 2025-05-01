import React from 'react'
import Noteitem from './Noteitem'

function Notes() {
    return (
        <div className='container'>
            <h2>My Notes</h2>
            <div className='d-flex gap-2'>
                <Noteitem />
            </div>
        </div>
    )
}

export default Notes
