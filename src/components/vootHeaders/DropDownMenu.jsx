import React, { Fragment, useEffect, useRef } from 'react';
import firebase from '../../firebase';
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

const DropDownMenu = (props) => {
    let toggleRef = useRef();
    console.log(props);
    useEffect(() => {
        if (props.toggle === true) {
            toggleRef.current.style.display = "block";
        }else{
            toggleRef.current.style.display = "none";
            document.body.onclick = function () {
                toggleRef.current.style.display ="none";
            }
        }
    },[props.toggle]);

let logout = () => {
    firebase.auth().signOut().then(_ => {
        toast.success("successfully logged out");
        props.history.push("/login");
    }).catch(err => {
        toast.err(err.message);
    })
}

let AnonymousUsers = () => {
    return <Fragment>
        <li>
        <li><Link to="/login">LogIn</Link></li>
        </li>
    </Fragment>
};
let AuthenticatedUsers = () => {
    return <Fragment>
    <li>
    <li><a href="#" onClick= {logout}>logout</a></li>
    <li><Link to="/account">My Account</Link></li>
    </li>
    </Fragment>
};

    return (
    <div className="dropdown" ref={ toggleRef }>
        <div className="arrow-up"></div>   {/* //ref is used to interact with native DOM element */}
        <ul>
            { firebase.auth().currentUser ? <AuthenticatedUsers /> : <AnonymousUsers /> }
            <li><Link to="/login"></Link></li>
            <li><Link to="/">Help & Legal</Link></li>
        </ul>
    </div>
    )
}

export default withRouter(DropDownMenu);
