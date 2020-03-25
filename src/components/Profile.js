import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Grid, Label, Segment} from 'semantic-ui-react'

const colStyle = {
    marginLeft: '10px'
}

function Profile({...props}) {


    return  <Grid columns={1}>
    <Grid.Column style={colStyle}>
      <Segment raised>
        <Label as='a' color='red' ribbon>
          Overview
        </Label>
        <span>Account Details</span>

        <p>Account Details here</p>

        <Label as='a' color='blue' ribbon>
          Purchases
        </Label>
        <span>Purchases</span>
             <p>Purchase Details here</p>

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

    }
}

const mapDispatchToProps = dispatch => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
