import axios from "axios";

const DeleteMessage = ({id, title}) => {

  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(`http://localhost:8800/article-delete/${id}`);
      if (del) {
        alert ("Article Deleted");
      }
    } catch (e) {
      alert ("Something went wrong, Could not perform action");
    }
  }

  return <>
    <div className="modal fade" id={`staticBackdrop${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Delete "{title}"</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this article?</p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" onClick={() => {handleDelete(id)}}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default DeleteMessage

