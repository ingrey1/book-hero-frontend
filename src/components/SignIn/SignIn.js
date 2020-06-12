import React, { useState } from "react";
import { connect } from "react-redux";
import {
  loginWithGoogle,
  createUserWithEmailPassword
} from "../../actions/auth";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import "./SignIn.css";

function SignIn({
  providers,
  user,
  firebaseAppAuth,
  loginWithGoogle,
  loginFunctions: {
    signInWithGoogle,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  },
  createUser,
  ...props
}) {
  const [credentialsState, setCredentialsState] = useState({
    email: "",
    password: "",
    passwordVerification: ""
  });
  const [signupState, setSignupState] = useState(false);
  const [errorsState, setErrorsState] = useState({
    email: false,
    password: false,
    passwordVerification: false
  });

  // IN REDUX HANDLE MESSAGES FOR FAILED SIGNUP AND FAILED LOGIN

  const validSignup = () => {
    return validEmail() && validPassword() && validPasswordVerification();
  };

  const validEmail = () => {
    return credentialsState.email.includes("@");
  };

  const validPassword = () => {
    return credentialsState.password.length > 6;
  };

  const validPasswordVerification = () => {
    return (
      credentialsState.passwordVerification.length ===
      credentialsState.password.length
    );
  };

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setCredentialsState({ ...credentialsState, [name]: value });
  };

  const handleLogin = () => {
    setErrorsState({
      ...errorsState,
      password: !validPassword(),
      email: !validEmail()
    });
    if (validEmail() && validPassword())
      loginWithGoogle(
        signInWithEmailAndPassword,
        credentialsState.email,
        credentialsState.password,
        firebaseAppAuth
      );
  };

  const handleSignup = () => {
    setErrorsState({
      ...errorsState,
      password: !validPassword(),
      email: !validEmail(),
      passwordVerification: !validPasswordVerification()
    });
    console.log("password", credentialsState.password);
    console.log("password verification", credentialsState.passwordVerification);
    if (validSignup()) {
      console.log("handlesignup called");
      createUser(
        createUserWithEmailAndPassword,
        credentialsState.email,
        credentialsState.password
      );
    }
  };

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "550px" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" className="secondary-color-text">
            <Image src={require("../../assets/images/logo.svg")} />{" "}
            {signupState ? "Signup" : "Login"}
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                error={
                  errorsState.email
                    ? {
                        content: "Please enter a valid email",
                        pointing: "below"
                      }
                    : null
                }
                onChange={handleChange}
                fluid
                icon="user"
                name="email"
                iconPosition="left"
                placeholder="E-mail address"
                value={credentialsState.email}
              />
              <Form.Input
                error={
                  errorsState.password
                    ? {
                        content: "Password must be at least 6 characters",
                        pointing: "below"
                      }
                    : null
                }
                onChange={handleChange}
                name="password"
                value={credentialsState.password}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              ></Form.Input>
              {signupState && (
                <Form.Input
                  error={
                    errorsState.passwordVerification
                      ? {
                          content: "Make sure your passwords match",
                          pointing: "below"
                        }
                      : null
                  }
                  onChange={handleChange}
                  name="passwordVerification"
                  value={credentialsState.passwordVerification}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Verify Password"
                  type="password"
                />
              )}

              <Button
                onClick={signupState ? handleSignup : handleLogin}
                className="login-button"
                fluid
                size="large"
              >
                {signupState ? "Signup" : "Login"}
              </Button>
            </Segment>
          </Form>
          <Message>
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => loginWithGoogle(signInWithGoogle)}
              className="google-button"
            >
              <Icon name="google" /> Sign in With Google
            </Button>
            <a
              className="toggle-signup-link"
              onClick={() => setSignupState(!signupState)}
            >
              {signupState ? "Login" : "Signup"}
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    loginWithGoogle: (f, email, password, authy) =>
      dispatch(loginWithGoogle(f, email, password, authy)),
    createUser: (f, email, password) =>
      dispatch(createUserWithEmailPassword(f, email, password))
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
