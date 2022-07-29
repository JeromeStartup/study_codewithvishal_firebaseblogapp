import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""

}

const Auth = () => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignup] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        setActive("")
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password dont match");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive("home");
      } else {
        return toast.error("all fields are mandatory to  fill");
      }
    }
    Navigate("/");
  };



  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "sign-In" : "sign-up"}
          </div>
        </div>
        <div className="row h1-100 justfy-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form classname='row'>
              <div className="col-12 py-3">
                <input type="email" classname='form-control input-text-box'
                  placeholder='Email'
                  name="email"
                  value={email}
                  onChange={handleChange} />
              </div>
              <div className="col-12 py-3">
                <input type="password"
                  classname='form-control input-text-box'
                  placeholder='Password'
                  name="password"
                  value={password}
                  onChange={handleChange} />
              </div>
              <div className="col-12 py-3 text-center">
                <button className={`btn ${!signUp ? "btn-sign-in" : "btn-sign--up"}`}
                  type="submit">
                  {!signUp ? "sign-in" : "sign-up"}
                </button>
              </div>
            </form>
            <div>
              {!signUp ? (
                <>
                  <div className="text center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      don't have an account ?
                      <span className="ling-danger" style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => setSignup(true)}
                      >
                        sign Up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      already have an account ?
                      <span
                        style={{ textDecoration: "none", cursor: "pointer", color: "#298af2" }}
                        onClick={() => setSignup(false)}>
                        sign In
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

export default Auth