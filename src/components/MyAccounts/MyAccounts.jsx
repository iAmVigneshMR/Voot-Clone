import React from 'react';
import { Link, Route, Switch,useRouteMatch } from 'react-router-dom';
import "./MyAccounts.css";
import UpdatePassword from './UpdatePassword';
import UploadPhoto from './UploadPhoto';
import { toast } from "react-toastify";
import firebase from '../../firebase';

const MyAccounts = (props) => {
  let { path, url } = useRouteMatch();
    let { displayName, photoURL, email } = props.users;
  
  let onRemoveUser = async () => {
    let user = firebase.auth().currentUser;
    await user.delete();
    toast.success("successfully account deleted");
  };

    return (
        <section id="MyAccountBlock">
        <article>
          <aside>
            <header>
              <figure>
                <Link to={`${url}/update-photo`}>
                  <span>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                  <img src={photoURL} alt={displayName} />
                </Link>
              </figure>
              <h3>{displayName}</h3>
            </header>
            <main>
              <h4>{email}</h4>
              <li><Link to="/update-phone">Update Phone Number</Link></li>
              <li><Link to="/update-password">Update Password</Link></li>
              <li><Link to="/movies/upload-movies">Upload movies</Link></li>
            </main>
            <footer>
            <li>
              <button className="btn" onClick={onRemoveUser}>
                Remove User
              </button>
            </li>
            </footer>
          </aside>
          <main>
            <Switch>
              <Route path={`${path}/:id`} exact>
                <UploadPhoto users = { props.users }/>
              </Route>
              {/* <Route path={`${path}/:updatePassword`} exact>
                <UpdatePassword users = { props.users }/>
              </Route> */}
            </Switch>
          </main>
        </article>
      </section>
    )
}

export default MyAccounts
