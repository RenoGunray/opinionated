import { Link } from "react-router-dom";


const CreateNewArticle = () => {

  
  return <>
    <form action="">
      <Link to={`/write`}>
        <button className="btn btn-dark text-success"><span className="fw-bolder">+</span> Create New</button>
      </Link>
    </form>
  </>
}

export default CreateNewArticle