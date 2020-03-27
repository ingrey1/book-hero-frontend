import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {Button} from 'semantic-ui-react' 
import {Grid} from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class ReadingMenu extends Component {
    constructor(props) {

        super(props);
        this.state = {
            isPaneOpen: false
        };
       
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }

   
 
    render() {
        return <div ref={ref => this.el = ref}>
            <Button color='blue' onClick={() => this.setState({ isPaneOpen: true })}>Toggle Reading Options</Button>
            
            <SlidingPane
                className='panel'
                overlayClassName='overlay-panel'
                isOpen={ this.state.isPaneOpen }
                title='Reading Options'
                width='300px'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                } }>
                <div>

                <Grid>
      <Grid.Column>
       
        

      </Grid.Column>
     
    
    </Grid>


                </div>
                <br />
                
            </SlidingPane>
            
        </div>;
    }
}

export default ReadingMenu