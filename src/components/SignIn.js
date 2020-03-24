import React, {useState} from 'react'
import {connect} from 'react-redux'
import {loginWithGoogle} from '../actions/auth'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'



function SignIn({loginFunctions: {signInWithGoogle}, ...props}) {

  const [credentialsState, setCredentialsState] = useState({email: "", password: "", passwordVerfication: ""})
  const [signupState, setSignupState] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setCredentialsState({...credentialsState, [name]: value})
  }

  const handleLogin = () => {

  }

  const handleSignup = () => {
    
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

          <Button color='blue' fluid size='large'>
            {signupState ? "Signup" : "Login"}
          </Button>
        </Segment>
      </Form>
      <Message>
      <Button style={{marginRight: '20px'}} onClick={() => props.loginWithGoogle(signInWithGoogle)} color='google plus'>
      <Icon name='google' /> Sign in With Google
    </Button>
      <a href='#' disabled>{signupState ? "Login": "Signup"}</a>
        
      </Message>
    </Grid.Column>
  </Grid>
      
  </div>
}

const mapDispatchToProps = (dispatch) => {

  return {
    loginWithGoogle: (f) => dispatch(loginWithGoogle(f)) 
  }

}

export default connect(null, mapDispatchToProps)(SignIn)