import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const EditArticle = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [photo, setPhoto] = useState(null);
  const [publish, setPublish] = useState(false);
  // const {user} = useContext(UserContext);
  
  const {id} = useParams();
  const published = true;
  // const [article, setArticle] = useState('');

  useEffect(() => {
    const get_article = async () => {
      try {
        const article = await fetch(`http://localhost:8800/single-article/${id}`);
        const json = await article.json();
        if (article.ok) {
          setTitle(json.title);
          setBody(json.body);
          setPublish(json.published);
        }
      } catch (e) {
        console.error("An error occured in trying to fetch single article");
      }
    }
    get_article();
  }, [id])

  const quillChange = (value) => {
      setBody(value);
  }

  // const handleFileChange = (event) => {
  //     const selectedFile = event.target.files[0];
  //     setPhoto(selectedFile);
  // }

  const publishArticle = async (published) => {
    console.log(published);
    try {
      await axios.put(`http://localhost:8800/publish-article/${id}`, {published});
      alert ('Article Published');
    } catch (e) {
      alert ("Something went wrong. Could not publish Article");
    }

  }

  const handleSave = async (ev) => {
      ev.preventDefault();
      try {
          // const formData = new FormData();
          // formData.append('image', photo);
          // formData.append('title', title);
          // formData.append('body', body);

          await axios.put(`http://localhost:8800/update-articles/${id}`, {title, body});
          alert ("Article Updated");

          // set input value to empty
          setTitle('');
          // setBody('');
          // setPhoto(null);
      } catch (e) {
          alert ("Article Failed to Update");
      }
  }

  /**
   * React quill toolbar option
   * 
   */
  
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

    <div className="bg-light uni-padding">
            
      <div className="editor-container">
          <div className="create">
            {/* <div className="create__upload">
                <label htmlFor="photo" className="create__upload--button"><i className="fa-solid fa-arrow-up-from-bracket upload-logo"></i> <span className="upload-text">Upload Image</span> </label>
                <input type="file" accept=".png, .jpg, .jpeg" id="photo" className="create__upload--image" name="image" onChange={handleFileChange} />
            </div> */}
            <div className="create__publish">
                <button className="create__publish--button me-4" onClick={handleSave}><i className="fa-solid fa-floppy-disk"></i> Save</button>
                {!publish && (<button className="create__publish--button" onClick={() => {publishArticle(published)}}><i className="fa-solid fa-share-from-square"></i> Publish</button>)}
            </div>
          </div>
        <form encType="multipart/form-data">
          <div className="titleGroup d-flex">
            <input type="text" className="titleGroup__titleInput" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            {/* <button className="titleGroup__publish">UPDATE</button> */}
          </div>
          <ReactQuill className="editor" modules={modules} theme="snow" value={body} onChange={quillChange} />
          {/* <div className="upload"> 
              <input type="file" accept=".png, .jpg, .jpeg" id="photo" className="upload__image" name="image" onChange={handleFileChange} />
              <label htmlFor="photo" className="upload__button"><i className="fa-solid fa-arrow-up-from-bracket upload-logo"></i> <span className="upload-text">Upload Image</span> </label>
          </div> */}
        </form>
      </div>
    </div>
  </>
}

export default EditArticle