import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import axios from "axios";

const Navbar = () => {

  const {user, setUser} = useContext(UserContext);
  // const [redirect, setRedirect] = useState(null);
  const navigate = useNavigate();

  const SignOut = async (ev) => {
    await axios.post('/logout');
    navigate('/');
    setUser(null);
  };

  // if (redirect) {
  //   return <Navigate to={'/'} />
  // }

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky">
  <div className="container-fluid">
    <Link className="navbar-brand nav-logo me-4" to="/">Opinionated</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        

        <li className="nav-item userProfile d-flex me-4">
          {
            !!user && (
              <>
              <img src={`http://localhost:8800/images/${user.image}`} alt="" className="userProfile__img" />
              <Link className="nav-link ms-2 user" to={`/accounts/${user._id}`}> <span className="user__fullname">{ user.full_name }</span> <span className="user__username"> @{ user.username } </span></Link>
              </>
              )
          }
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
        
      </ul>
      <form className="d-flex w-50 me-auto">
        <button className="search-btn" type="submit"><i className="fa-solid fa-magnifying-glass fw-bold"></i></button>
        <input className="search-bar bg-light" type="search" placeholder="Search..." aria-label="Search" />
      </form>
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active message" aria-current="page" to="register/"><i className="fa-solid fa-envelope"></i></Link>
        </li>

        {!!user && (
          <li className="nav-item">
            <button className="signout-btn" onClick={SignOut}> <i className="fa-solid fa-power-off text-danger fw-bolder"></i> Sign Out </button>
          </li>  
        )}

        {
          !user && (
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="register/">Sign Up</Link>
          </li>    
          )
        }

        {
          !user && (
            <li className="nav-item">
              <Link className="nav-link" to="login/">Sign In</Link>
            </li>
            )
        }

        
      </ul>
    </div>
  </div>
</nav>
    </>
}

export default Navbar