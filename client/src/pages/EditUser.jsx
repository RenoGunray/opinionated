import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const EditUser = () => {

  // const { user } = useContext(UserContext);

  const {id} = useParams();

  const [username, setUsername] = useState('');
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    const get_user = async () => {
      try {
        const user = await fetch(`http://localhost:8800/user/${id}`);
        const json = await user.json();
        if (user.ok) {
          setUsername(json.username);
          setFullName(json.full_name);
          setEmail(json.email);
        }
      } catch (e) {
        console.error("An error occured in trying to fetch single article");
      }
    }
    get_user();
  }, [id]);

  // const [photo, setPhoto] = useState(null);

  const [message, setMessage] = useState('');

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setPhoto(selectedFile);
  // }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append('username', username);
      // formData.append('full_name', full_name);
      // formData.append('email', email);
      // formData.append('image', photo);

      await axios.put(`http://localhost:8800/edit-user/${id}`, {username, full_name, email});
      setMessage ('Changes Saved');
      setTimeout(() => {
        navigate(`/accounts/${id}`);
        window.location.reload();
      }, 1000);
    } catch (e) {
      alert("Something went wrong");
    }
  }

  return <>
    <div className="formContainer w-100">
      {/* <Link to='/' className="link-defaults-off text-center"> <h1>Opt.</h1> </Link> */}

      <div className="formCard border">
          <h4 className="formCard__title text-center">Edit Profile</h4>
          <div className="formCard__body">
            <form className="form" encType="multipart/form-data">
                
              {/* <div className="upload"> 
                <input type="file" accept=".png, .jpg, .jpeg" id="photo" className="upload__image" name="image" onChange={handleFileChange} />
                <label htmlFor="photo" className="upload__button"><i className="fa-solid fa-arrow-up-from-bracket upload-logo"></i> <span className="upload-text">Profile Photo</span> </label>
              </div> */}

              <div className="form-group mt-4">
                <input type="text" className="form-control" name="username" placeholder="DopeDoe123..." value={username} onChange={(ev) => setUsername(ev.target.value)} />
              
              </div>

              <div className="form-group mt-4">
                <input type="text" className="form-control" name="full_name" placeholder="John Doe" value={full_name} onChange={(ev) => setFullName(ev.target.value)} />
              </div>

              <div className="form-group mt-4">
                <input type="email" className="form-control" name="email" placeholder="johndoe@gmail.com" value={email} onChange={(ev) => setEmail(ev.target.value)} />
              </div>

              {/* <div className="form-group mt-4">
                  <input type="password" className="form-control" name="password" placeholder="password..." value={password} onChange={(ev) => setPassword(ev.target.value)} />
              </div> */}

              <div className="mt-4">
                {message && <p className="alert alert-success"> { message } </p>}
              </div>

              <button className="btn btn-primary mt-4 w-100" onClick={handleSubmit}>Save Changes</button>

              {/* <div className="text-center mt-4">
                  <p className="">Already have an Account?<Link to='/login'>Login</ Link> </p>
              </div> */}

            </form>
        </div>
      </div>
    </div>
  </>
}

export default EditUser