import { React } from "react";
import { Link } from "react-router-dom";


const Arguments = ({args}) => {

  const closeFunction = () => {
    const navSide = document.querySelector('.argSide');
    navSide.classList.toggle('argSide-active');
  }

  return <>
    <div className="argSide__header">
      <h4>Arguments</h4>
      <button className="argSide__header--close" onClick={closeFunction}><i className="fa-solid fa-circle-xmark"></i></button>
    </div>
    { args && args.length > 0 ? (
      args.map((arg) => (
      <>
        <Link to={`/fullarg/${arg._id}`} className="arg-links">
          <div className="card argCard border p-2 mt-1">
            <h4 className="argCard__username"> { arg.author.username } </h4>
            <h4 className="argCard__title"> { arg.title } </h4>
          </div>
        </Link>
      </>
      ))
    ) : (
      <p>No arguments Found</p>
    )
     }

  </>
}

export default Arguments