import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import firebase from '../../firebase';
import {withRouter} from 'react-router-dom';
import "./auth.css";

const Login = ({history}) => {
    // contolled form
    let [setUser , setStateUser] = useState({
      email:"",
      password:"",
      loading:false,
    });

    let handleChange = e => {
      let { name , value} = e.target;
      setStateUser({...setUser, [name]: value}); 
    };

    let { email, password, loading} = setUser; //destucturing from "...setUser"

    let handleSubmit = async e =>{
      e.preventDefault();
      try {
        setStateUser({ loading: true });
        let userData = await firebase.auth().signInWithEmailAndPassword(email, password);
        // emailverification
        if (userData.user.emailVerified === true) {
          let message = `${userData.user.email} has been successfully logged in`;
          toast.success(message);
          history.push("/");
        } else {
          let errorMessage = `${userData.user.email} not yet verified please verify and login`;
          toast.error(errorMessage);
        }
        // console.log(setUser);
      } catch (err) {
        toast.error(err.message);
      }
    }
    return (
        <section id="authBlock">
        <article>
            <div>
          <h1>Welcome to Voot!</h1>
          <p>Please Login for a more personalised experience.</p>
          <div className="form-group">
            <Link to ="/otp" className="phoneBtn">continue with phone number</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="email" id="email" value={ email } onChange={handleChange} />
              <label htmlFor="email">email</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" value={ password } onChange={handleChange} />
              <label htmlFor="password">password</label>
            </div>
            <div className="form-group register_Block">
              <Link to="/register">Register</Link>
              <Link to="/password-reset">Reset Password</Link>
            </div>
            <div className="form-group">
              <button>
                {loading === true ? 'loading...' : 'Login'}  
              </button>
            </div>
          </form>
        </div>
        </article>
      </section>
    )
}

export default withRouter(Login);
