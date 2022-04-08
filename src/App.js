import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function App() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Sign in By Google

  const handleSignInGoogle = () => {
    console.log("workinf");
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.error(error));
  };
  //Sign in By Git Hub
  const handleSignInGitHub = () => {
    console.log("clicked on Git hub signin");
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.error(error));
  };
  // Sign In With Facebook
  const handleSignInFacebook = () => {
    console.log("clicked on fb signin");
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="w-50 mx-auto">
        <h2 className="text-primary my-3">Please Log In </h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide correct Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div>
          <p className="text-muted">Or Sign Up Using</p>
          <div>
            <button className="mx-4" onClick={handleSignInGoogle}>
              Sign In By Google
            </button>
            <button onClick={handleSignInGitHub}>Git Hub</button>
            <button onClick={handleSignInFacebook}>Facebook</button>
          </div>
        </div>
      </div>
      <div className="user-info mx-auto w-50 ">
        <h2>{user.displayName}</h2>
        <img src={user.photoURL} alt="" />
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}

export default App;
