import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getCookie } from '../utils/getCookie';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://backend-pk89.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`,
        },
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate(0); // reload on logout
      }
    } catch (error) {
      console.error('Error Logging Out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top px-3"
         style={{ background: 'linear-gradient(135deg, #4e54c8,rgb(161, 166, 254))' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          📓 NoteVault
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav gap-1">
            <Link
              className={`nav-link text-white ${location.pathname === '/' && 'fw-semibold text-warning'}`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`nav-link text-white ${location.pathname === '/About' && 'fw-semibold text-warning'}`}
              to="/About"
            >
              About
            </Link>
          </div>

          <div className="d-flex mt-2 mt-lg-0">
            <button
              className="btn btn-outline-light rounded-pill px-3 py-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
