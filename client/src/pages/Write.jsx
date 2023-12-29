import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState} from "react";
import axios from "axios";

const Write = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [photo, setPhoto] = useState(null);
    // const {user} = useContext(UserContext);

    const quillChange = (value) => {
        setBody(value);
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setPhoto(selectedFile);
    }

    // console.log(photo.name);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', photo);
            formData.append('title', title);
            formData.append('body', body);

            await axios.post('http://localhost:8800/post-articles', formData);
            alert ("Article Saved");

            // set input value to empty
            setTitle('');
            setBody('');
            setPhoto(null);
        } catch (e) {
            alert ("Article Failed to Publish");
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
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="">
                    <div className="create">
                        <div className="create__upload">
                            <label htmlFor="photo" className="create__upload--button"><i className="fa-solid fa-arrow-up-from-bracket upload-logo"></i> <span className="upload-text">Upload Image</span> </label>
                            <input type="file" accept=".png, .jpg, .jpeg" id="photo" className="create__upload--image" name="image" onChange={handleFileChange} />
                        </div>
                        <div className="create__publish">
                            <button className="create__publish--button"><i class="fa-solid fa-floppy-disk"></i> Save</button>
                        </div>
                    </div>
                    <div className="titleGroup d-flex">
                        <input type="text" className="titleGroup__titleInput" placeholder="Title..." value={title} onChange={(ev) => setTitle(ev.target.value)} />
                    </div>
                    <ReactQuill className="editor" modules={modules} theme="snow" value={body} onChange={quillChange} />
                </form>
            </div>
        </div>
    </>
}

export default Write