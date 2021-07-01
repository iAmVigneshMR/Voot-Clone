import React ,{ Fragment, useEffect, useState } from 'react';       //rafce
import Navbar from './components/vootHeaders/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PasswordReset from './components/Auth/PasswordReset';
import Otp from './components/Auth/Otp';
import PageNotFound from './pages/404';

// for taastify refer website
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import firebase from "./firebase";
import MyAccounts from './components/MyAccounts/MyAccounts';
import PrivateRoute from './components/util/PrivateRoute';
import PublicRoute from './components/util/PublicRoute';
import UpdatePassword from './components/MyAccounts/UpdatePassword';
import UpdatePhoneNumber from './components/MyAccounts/UpdatePhoneNumber';
import CreateMovies from './components/VootMovies/CreateMovies';



const App = () => {
    //for signedin or not
    let [users , setUsers] = useState("hello");
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {   //"onAuthStateChanged" uded to check the user signed in or signed out
            // console.log(user);
            if (user) {
                // console.log(user.uid);
                setUsers(user);    //authenticated users
                // history.push("/");
            } else {
                // console.log("not logged in")
                setUsers("");    //anonymous user or signed out
                // history.push("/login");
            }
        })
        },[users]);
    return (
        <Fragment>
            <Router>
            <Navbar users={ users } />
            < ToastContainer />
            {/* routing starts */}
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <PublicRoute path="/login" exact>
                    <Login />
                </PublicRoute>
                <PublicRoute path="/register" exact>
                    <Register />
                </PublicRoute>
                <PublicRoute path="/password-reset" exact>
                    <PasswordReset />
                </PublicRoute>
                <PublicRoute path="/otp" exact>
                    <Otp />
                </PublicRoute>
                <PrivateRoute path="/account">
                    <MyAccounts users={users} />
                </PrivateRoute>
                <PrivateRoute path="/update-phone" exact>
                    <UpdatePhoneNumber users={users} />
                </PrivateRoute>
                <PrivateRoute path="/update-password" exact>
                    <UpdatePassword users={users} />
                </PrivateRoute>
                <PrivateRoute path="/movies/upload-movies" exact>
                    <CreateMovies users={users} />
                </PrivateRoute>
                {/* page not found always be at end */}
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
            {/* routing ends */}
            </Router>
        </Fragment>
    )
}

export default App;
