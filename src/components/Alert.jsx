import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Alert = ({color, setIsAlert, alertMessage}) => {
    const context = useContext(noteContext)
    setTimeout(()=>{
      setIsAlert(false)
    },2000)
  return (
    <div>
      <div className={`alert alert-${color} m-2`} role="alert">
        {alertMessage}
      </div>
    </div>
  )
}

export default Alert
