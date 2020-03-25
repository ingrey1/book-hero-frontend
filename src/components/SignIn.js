import React, {useState} from 'react'
import {connect} from 'react-redux'
import {loginWithGoogle, createUserWithEmailPassword} from '../actions/auth'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'



function SignIn({providers, user, firebaseAppAuth, loginWithGoogle, loginFunctions: {signInWithGoogle, signInWithEmailAndPassword,createUserWithEmailAndPassword}, createUser, ...props}) {

  const [credentialsState, setCredentialsState] = useState({email: "", password: "", passwordVerification: ""})
  const [signupState, setSignupState] = useState(false)
  const [errorsState, setErrorsState] = useState({email: true, password: true, passwordVerification: true})
  
  const valid = () => {
    return validEmail() && validPassword() && validPasswordVerification()
  }

  const validEmail = () => {
      return credentialsState.email.includes('@')
  }

  const validPassword = () => {
    return credentialState.password.length > 6
  }

  const validPasswordVerification = () => {
    return credentialState.passwordVerification.length === credentialsState.password.length
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setCredentialsState({...credentialsState, [name]: value}, () => {
         
    })
  }

 

  const handleLogin = () => {

      if (valid()) loginWithGoogle(signInWithEmailAndPassword, credentialsState.email, credentialsState.password, firebaseAppAuth)
      // const credential = providers.emailAuthProvider.credential(credentialsState.email, credentialsState.password).then(
      //   (res) => console.log(res)
      // )
     
  }

  const handleSignup = () => {
    
    console.log("password", credentialsState.password)
    console.log("password verification", credentialsState.passwordVerification)
      if (valid()){
        console.log("handlesignup called")
        createUser(createUserWithEmailAndPassword, credentialsState.email, credentialsState.password)
      }
      
  }

 
  return <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/background_book.jpg)`}}>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='blue' textAlign='center'>
        <Image src={process.env.PUBLIC_URL + '/logo.svg'} /> {signupState ? "Signup" : "Login"}
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input onChange={handleChange} fluid icon='user' name="email" iconPosition='left' placeholder='E-mail address' value={credentialsState.email} />
          <Form.Input onChange={handleChange}
            name="password"
            value={credentialsState.password} 
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          {signupState && <Form.Input
            onChange={handleChange}
            name="passwordVerification"
            value={credentialsState.passwordVerification} 
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Verify Password'
            type='password'
          /> }

          <Button onClick={signupState ? handleSignup : handleLogin  } color='blue' fluid size='large'>
            {signupState ? "Signup" : "Login"}
          </Button>
        </Segment>
      </Form>
      <Message>
      <Button style={{marginRight: '20px'}} onClick={() => loginWithGoogle(signInWithGoogle)} color='google plus'>
      <Icon name='google' /> Sign in With Google
    </Button>
      <a onClick={() => setSignupState(!signupState)}>{signupState ? "Login": "Signup"}</a>
        
      </Message>
    </Grid.Column>
  </Grid>
      
  </div>
}

const mapDispatchToProps = (dispatch) => {

  return {
    loginWithGoogle: (f, email, password, authy) => dispatch(loginWithGoogle(f, email, password, authy)),
    createUser: (f, email, password) => dispatch(createUserWithEmailPassword(f, email, password)) 
  }

}

export default connect(null, mapDispatchToProps)(SignIn)