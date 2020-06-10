import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SignIn from "../SignIn/SignIn";
import { connect } from "react-redux";
import { authorizeUserOrLogout } from "../../actions/auth";
import "./Welcome.css";

function Welcome({
  user,
  firebaseAppAuth,
  providers,
  authorize,
  loginFunctions,
  loggedIn,
  history,
  location,
  ...props
}) {
  useEffect(() => {
    console.log("use effect welcome comp, called just once");
    authorize();
  }, []);

  useEffect(() => {
    console.log("use effect Welcome Comp, called every time");
    if (loggedIn) {
      history.push("/home");
    } else {
      if (location.path === "/") history.push("/welcome");
    }
  });

  return (
    <Container className="noPadding" fluid>
      {/* SignIn Component and Background Book Image */}

      <Row className="noMargin noBottomMargin">
        <Col className="noPadding image-col">
          <div id="background-image-div"></div>
        </Col>
        <Col className="login-col">
          <SignIn
            user={user}
            firebaseAppAuth={firebaseAppAuth}
            providers={providers}
            loginFunctions={loginFunctions}
          />
        </Col>
      </Row>

      <Row className="noTopMargin">
        <hr className="welcome-divider" />
      </Row>

      <Row>
        {/* About Book Hero Section */}
        <Col>
          <section className="shift-right">
            <h3>Browse, Read, Write</h3>
            <p>
              Explore Thousands of Books including <br />
              Fantasy, Non-Fiction, Romance, <br />
              Fan-Fiction, and more...
            </p>
            <br />

            <p>
              Use Book Hero to share your own stories and creations with the
              world
            </p>
          </section>
        </Col>
        <Col className="closer-book-image">
          <div>
            <img
              className="book-image"
              src={require("../../assets/images/1q84_book_cover.jpg")}
              alt="1q84 book cover"
            />
          </div>
        </Col>
        <Col>
          <div>
            <img
              className="book-image"
              src={require("../../assets/images/hobbit_book_cover.jpg")}
              alt="1q84 book cover"
            />
          </div>
        </Col>
        <Col>
          <div>
            <img
              className="book-image"
              src={require("../../assets/images/a_tale_of_two_cities_book_cover.jpg")}
              alt="1q84 book cover"
            />
          </div>
        </Col>
      </Row>

      <Row className="noTopMargin">
        <hr className="welcome-divider" />
      </Row>

      {/* Personal Testamonial */}

      <Row>
        <Col>
          <section className="testimonial-image">
            <img
              alt="image for random user"
              src={require("../../assets/images/cherry_blossom_tree.jpg")}
            />
            <br />
            <label>
              <strong>Lost Song</strong>
            </label>
          </section>
        </Col>
        <Col className="testimonial-col">
          <section className="testimonial-text">
            <p>
              "I finally found a great place to share my stories! <br />
              The community here is amazing!"
            </p>
            <p className="testimonial-small-text">
              <em>Lost Song</em>'s' "The Pterodactyl's Revenge" has been read
              over 10k times
            </p>
          </section>
        </Col>
      </Row>
      <Row className="noTopMargin">
        <hr className="welcome-divider" />
      </Row>

      {/* Join the conversation section*/}
      <Row>join the convo</Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authorize: () => dispatch(authorizeUserOrLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
