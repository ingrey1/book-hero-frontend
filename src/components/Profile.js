import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Grid, Label, Segment, Icon, List, Input, Button} from 'semantic-ui-react'
import {updateUserInfo} from '../actions/auth'

const colStyle = {
    marginLeft: '10px'
    
}

function Profile({auth: {email, username, firstName, lastName}, updateUserInfo, ...props}) {

    const [editState, setEditState] = useState({firstName: false, lastName: false, username: false})
    const [editInputState, setEditInputState] = useState({firstName: "", lastName: "", username: ""})

    const handleEditInputChange = (e) => {
           setEditInputState({
             ...editInputState,
             [e.target.name]: e.target.value
           })
    }

    const handleUpdateUserInfo = (name) => {

      updateUserInfo(editInputState)
      setEditState({...editState, [name]: false})
        
    }

    return  <Grid columns={1}>
    <Grid.Column style={colStyle}>
      <Segment raised>
        <Label as='a' color='red' ribbon>
          Overview
        </Label>
        

        <List divided selection>
    <List.Item>
      <Label color='red' horizontal>
        Email
      </Label>
      {email ? email : 'edit me!'}
    </List.Item>

    <List.Item>
      <Label color='red' horizontal>
        First Name
      </Label>
      {editState.firstName ? <span><Input onChange={handleEditInputChange} name="firstName" value={editInputState.firstName} placeholder={"First Name"} /><Button onClick={() => handleUpdateUserInfo('firstName')} color="red">Confirm</Button></span>: <span>{(firstName || firstName === "") ? firstName : 'edit me!'} <Icon onClick={() => setEditState({...editState, firstName: true})} name="edit"></Icon></span>}
    </List.Item>

    <List.Item>
      <Label color='red' horizontal>
        Last Name
      </Label>
      {editState.lastName ? <span><Input onChange={handleEditInputChange} name="lastName" value={editInputState.lastName} placeholder={"Last Name"} /><Button onClick={() => handleUpdateUserInfo('lastName')} color="red">Confirm</Button></span>: <span>{(lastName || lastName === "") ? lastName : 'edit me!'} <Icon onClick={() => setEditState({...editState, lastName: true})} name="edit"></Icon></span>}

    </List.Item>

    <List.Item>
      <Label color='red' horizontal>
        Username
      </Label>
      {editState.username ? <span><Input onChange={handleEditInputChange} name="username" value={editInputState.username} placeholder={"Username"} /><Button onClick={() => handleUpdateUserInfo('username')} color="red">Confirm</Button></span>: <span>{(username || username === "") ? username : 'edit me!'} <Icon onClick={() => setEditState({...editState, username: true})} name="edit"></Icon></span>}

    </List.Item>

    </List>
       
   

  </Segment>
  <Segment raised>


        <Label as='a' color='blue' ribbon>
          Purchases
        </Label>
        
             
    </Segment>
    
    <Segment raised>
             <Label as='a' color='teal' ribbon>
          Library Summary
        </Label>
        
             <p>Library Summary</p>
       
      </Segment>
    </Grid.Column>
    </Grid>

}

const mapStateToProps = state => {
    return {

        auth: state.auth

    }
}

const mapDispatchToProps = dispatch => {
   return {

    updateUserInfo: (info) => dispatch(updateUserInfo(info))

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
