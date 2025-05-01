import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getCookie } from '../utils/getCookie'

const Navbar = () => {
  let location = useLocation()
  const navigate=useNavigate()
  const handleLogout = async () => {
    try {
      const response = await fetch('https://backend-kvcg.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`,
        },
        credentials: "include", // Required to send cookies with cross-origin requests
      })
      
      const data=await response.json()
      console.log(data)
      if (response.ok) {
        navigate(0) // Redirect only if logout is successful
      }
    } catch (error){
      console.error('Error Logging Out:', error)
    }
  }
  return (

    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-1 position-sticky top-0 z-2">
        <div className='d-flex justify-content-around w-100'>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className={`nav-link ${location.pathname === "/" && "active"}`} to="/" aria-current="page" >Home</Link>
                <Link className={`nav-link ${location.pathname === "/About" && "active"}`} to="/About">About</Link>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
