import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {Button} from 'semantic-ui-react' 
import {Grid} from "semantic-ui-react";
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {setTextSize} from '../../actions/currentChapter'
import {getBookByChapter} from '../../utilities/helpers'
import {updateReadingStatus} from '../../api/api'
import "./ReadingMenu.css"





const readingOptionsButtonStyle = {
  margin: '25px'
}

class ReadingMenu extends Component {
    constructor(props) {

        super(props);
        
        this.state = {
            isPaneOpen: false,
            value: 1
           
        };
       
    }

    handleChapterClick = (event) => {
      const chapterNum = event.target.id
      //updateReadingStatus(userId, bookId, token, newCurrentWord, newCurrentChapter)
      updateReadingStatus(this.props.auth.userId, this.props.bookId, localStorage.getItem('fire_token') , 1, chapterNum).
       then(res => res.json()).then(() => {
              // TODO: chapter has been updated, so load that chapter
              
       }).catch(err => console.log("error changing chapters"))
      
    }

    renderChapterLinks = () => {
          const chapter = getBookByChapter(this.props.books, this.props.bookId)
         
          if (chapter) {  
            const chapterCount = getBookByChapter(this.props.books, this.props.bookId).chapter_count
            const chapters = []
            
            for (let i = 0; i < chapterCount; i++) {
            chapters.push(<li id={`${i + 1}`} key={Math.random()} onClick={this.handleChapterClick}>Chapter {i + 1}</li>)
            }
           
            return chapters
         }
          
    }

    onTextSliderChange = (newValue) => {
       console.log('new value', newValue) 
       this.props.changeFontSize(newValue)  
    }
 
    componentDidMount() {
        Modal.setAppElement(this.el);
    }

   
 
    render() {
        return <div ref={ref => this.el = ref}>
            <Button style={readingOptionsButtonStyle} color='blue' onClick={() => this.setState({ isPaneOpen: true })}>Toggle Reading Options</Button>
            
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
       <Grid.Row>         
      <Grid.Column>
       
      <div style={{width: '200px'}}>
      <Typography  id="discrete-slider" gutterBottom>
        Text Size
      </Typography>
      <Slider
        
        onChange={(e) => this.setState({value: e.target.value})}
        defaultValue={this.props.textSize}
        getAriaValueText={this.onTextSliderChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={12}
        marks={[{value: 24, label: 'Small'}, {value: 36, label: 'Medium'}, {value: 48, label: 'Large'}]}
        min={24}
        max={48}
      />
      </div>

      </Grid.Column>

      </Grid.Row>  

      <Grid.Row>

        <Grid.Column>
       <h2>Chapters</h2>
           
      <div id="chapter-links">
          
          {this.renderChapterLinks()}
        
          
       </div>
       </Grid.Column>
      </Grid.Row>     
    
    </Grid>


                </div>
                <br />
                
            </SlidingPane>
           
        </div>;
    }
}

const mapStateToProps = state => {
  return {

    textSize: state.currentChapter.displayOptions.textSize,
    books: state.library.userBooks,
    bookId: state.currentChapter.currentChapter.book_id,
    auth: state.auth

  }
}

const mapDispatchToProps = dispatch => {
  
  return {

    changeFontSize: (newSize) => dispatch(setTextSize(newSize))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingMenu)