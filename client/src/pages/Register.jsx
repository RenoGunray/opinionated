import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState('');
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null)

    const [error, setError] = useState('');
    const [succ, setSuccess] = useState('');

    const handleFileChange = (ev) => {
        setPhoto(ev.target.files[0]);
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            if ( username !== '' && full_name !== '' && email !== '' && password !== '') {
                const formData = new FormData();
                formData.append('image', photo);
                formData.append('username', username);
                formData.append('full_name', full_name);
                formData.append('email', email);
                formData.append('password', password);
    
                await axios.post("http://localhost:8800/register", formData);
                setSuccess('User Registered Successful.');
                // alert("Register Succesful");
            } else {
                setError('Please make sure all fields are filled.');
            }

        }catch (e) {
            alert("Registration Faild");
        }
    }

    return <>
        <div className="Container dFlex">
            <div className="sideCover">
                <div className="sideCover__header">
                    <h1 className="sideCover__header--title">Opinionated</h1>
                    <h4 className="sideCover__header--subtitle">Looking Forward To Having You Dear Writer</h4>
                </div>
            </div>

            <div className="formContainer">
                {/* <Link to='/' className="link-defaults-off text-center"> <h1>Opt.</h1> </Link> */}

                <div className="formCard">
                    <h4 className="formCard__title text-center">Register</h4>
                    <div className="formCard__body">
                        <form className="form" encType="multipart/form-data">
                            
                            <div className="upload"> 
                                <input type="file" accept=".png, .jpg, .jpeg" id="photo" className="upload__image" name="image" onChange={handleFileChange} />
                                <label htmlFor="photo" className="upload__button"><i className="fa-solid fa-arrow-up-from-bracket upload-logo"></i> <span className="upload-text">Profile Photo</span> </label>
                            </div>

                            <div className="form-group mt-4">
                                <input type="text" className="form-control" name="username" placeholder="Pen Name" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                            </div>

                            <div className="form-group mt-4">
                                <input type="text" className="form-control" name="full_name" placeholder="John Doe" value={full_name} onChange={(ev) => setFullName(ev.target.value)} />
                            </div>

                            <div className="form-group mt-4">
                                <input type="email" className="form-control" name="email" placeholder="johndoe@gmail.com" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                            </div>

                            <div className="form-group mt-4">
                                <input type="password" className="form-control" name="password" placeholder="password..." value={password} onChange={(ev) => setPassword(ev.target.value)} />
                            </div>

                            <div className="mt-4">
                                {error && <p className="alert alert-danger"> { error } </p>}
                                {succ && <p className="alert alert-success"> { succ } </p>}
                            </div>

                            <button className="btn btn-primary mt-4 w-100" onClick={handleSubmit}>Register</button>

                            <div className="text-center mt-4">
                                <p className="">Already have an Account?<Link to='/login'>Login</ Link> </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
    </div>
    </>
}

export default Register