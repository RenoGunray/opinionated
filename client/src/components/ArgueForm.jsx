import { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";

const ArgueForm = ({art_id}) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  // const {art_id} = useParams();

  const quillChange = (value) => {
    setBody(value);
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`/arguments`, {art_id, title, body});
      alert ("Argue Sent");
      setTitle('');
      setBody('');
    } catch (e) {
      alert("Something went wrong. Couldn't send argument");
    }
  }



  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['link'],
    
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction
  
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
  ];

const modules = {
    toolbar: toolbarOptions,
}

  return <>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Formulate Argument</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="titleGroup d-flex">
                <input type="text" className="titleGroup__titleInput" placeholder="Arguing Point..." value={title} onChange={(ev) => setTitle(ev.target.value)} />
              </div>
              <ReactQuill className="editor" modules={modules} theme="snow" value={body} onChange={quillChange} />
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default ArgueForm