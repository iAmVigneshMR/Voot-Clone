import React, {useState} from "react";
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import {toast} from 'react-toastify';
import faker from "faker/locale/en_IND";
import md5 from "md5";
import "./auth.css";

const Register = () => {
  // contolled form
  let [setUser , setStateUser] = useState({
    username:"",
    email:"",
    password:"",
    confirm_password:"",
    loading:false,
  });

  let handleChange = e => {
    let { name , value} = e.target;
    setStateUser({...setUser, [name]: value}); 
  };
  
  let { username, email ,password ,confirm_password ,loading} = setUser; //destructiring from above(handleChange(...setuser))

  let handleSubmit = async e => {
    e.preventDefault()                       //to avoid browser behavior (preventing reloading)
    try {
      // console.log(setUser);
      if (password === confirm_password) {
        setStateUser({loading : true});
        let userData = await firebase.auth().createUserWithEmailAndPassword(email , password);
        let verificationMessage = `A verification message has been sent to ${email} please verify and use account `;
        userData.user.sendEmailVerification(); //it sends email for verification
        toast.success(verificationMessage);
        console.log("user created" , userData);

        // update user profice
        await userData.user.updateProfile({
          displayName : username,
          // photoURL : faker.image.avatar()    // using faker
          photoURL : `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,  //identicon gives some other image
        })

        // save user in real time database (for the enable "realtime database" in firebase)
        await firebase.database().ref('users').child(userData.user.uid).set({   //in "child" we can create n number of DB , "set" is ued to save the data
          email : userData.user.email,
          displayName : userData.user.displayName,
          photoURL : userData.user.photoURL,
          uid : userData.user.uid,
          RegistrationDate : new Date().toString(),
        });  


      } else {
        console.log("password not match");
        toast.error("Password not Matching...");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }finally{
    setStateUser({
      username:"",
      email:"",
      password:"",
      confirm_password:"",
      loading:false,
    })}
  }
  return (
    <section id="authBlock">
    <article>
        <div>
      <h1>Welcome to Voot!</h1>
      <p>Please Register for a more personalised experience.</p>
      <form onSubmit = { handleSubmit }>
      <div className="form-group">
          <input type="text" name="username" id="username" value={ username } onChange={ handleChange } />
          <label htmlFor="username">username</label>
        </div>
        <div className="form-group">
          <input type="text" name="email" id="email" value={ email } onChange={ handleChange }/>
          <label htmlFor="email">email</label>
        </div>
        <div className="form-group">
          <input type="password" name="password" id="password" value={ password } onChange={ handleChange } />
          <label htmlFor="password">password</label>
        </div>
        <div className="form-group">
          <input type="password" name="confirm_password" id="confirmpassword" value={ confirm_password } onChange={ handleChange } />
          <label htmlFor="confirmpassword">confirmpassword</label>
        </div>
        <div className="form-group register_Block">
          <span style={{'fontSize':'1.3rem'}}>Already have an account</span>
          <Link to="/login">Login</Link>
        </div>
        <div className="form-group">
          <button>
            {loading === true ? "loading" : "Register"}  {/*conditional rendering(ternary operator)*/}
            </button>
        </div>
      </form>
    </div>
    </article>
  </section>
  );
};

export default Register;
