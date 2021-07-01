import React, { useState } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";

import "../Auth/auth.css";
import { toast } from "react-toastify";

const Updatephone = props => {
  let { updatephone } = useParams();
  let [state, setState] = useState({
    phone: "",
    loading: false,
  });
  let { phone, loading } = state;

  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
        let user = firebase.auth().currentUser;
        await user.updatePhoneNumber(phone);
        toast.success("Successfully phone updated");
        props.history.push("/account");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
    setState({ loading: false });
  };
  return (
    <section id="authBlock">
      <article>
        <div>
          <h1>Welcome to Voot!</h1>
          <p> update phone</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                id="phone"
                required
                value={phone}
                onChange={handleChange}
              />
              <label htmlFor="phone">phone</label>
            </div>

            <div className="form-group register_Block">
              <Link to="/account">go back to account</Link>
            </div>
            <div className="form-group">
              <button>
                {loading === true ? "loading..." : "Update Phone Number"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default withRouter(Updatephone);