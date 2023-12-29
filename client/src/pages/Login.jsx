import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // send to api (nodejs api) http://localhost:8800/login
        try{
            if (email !== '' && password !== '') {
                const {data} = await axios.post('/login', { email, password });
                setUser(data);
                setRedirect(true);
                // alert("Login successful");
            } else {
                setError('Please make sure all fields are filled');
            }
        } catch (e) {
            setError('Failed to Log in. Please check your credetials and try again' );
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return <>
    <div className="Container dFlex">
        <div className="sideCover">
            <div className="sideCover__header">
                <h1 className="sideCover__header--title">Opinionated</h1>
                <h4 className="sideCover__header--subtitle">Welcome Dear Writer</h4>
            </div>
        </div>
        <div className="formContainer">
        {/* <Link to='/' className="link-defaults-off text-center"> <h1>Opt.</h1> </Link> */}
            <div className="formCard">
                <h4 className="formCard__title text-center">Log In</h4>
                <div className="formCard__body">
                    <form className="formCard__body--form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Username/email" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                        </div>
                        <div className="form-group mt-4">
                            <input type="password" className="form-control" placeholder="Password..." value={password} onChange={(ev) => setPassword(ev.target.value)} />
                        </div>
                        <div className="text-center mt-4">
                            { error && <p className="alert alert-danger"> { error } </p> }
                            <p className="">Don't have an Account? <Link to='/register'>Register</ Link> </p>
                        </div>
                        <button className="btn btn-primary w-100">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Login