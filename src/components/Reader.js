import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {retrieveCurrentChapter, updateChapterLocation, updateReadingInfo, startReader, endReader, setNextChapter, setPreviousChapter} from '../actions/currentChapter'
import {Row, Col, Container} from 'react-bootstrap'
import {Button, Icon} from 'semantic-ui-react'
import {getBookByChapter, calculatePercentOfChapterForCurrentPage} from '../utilities/helpers'




const readerStyles = {
    minWidth: '700px',
    maxWidth: '700px'
}

const readerContainerStyles = {
    marginTop: '25px'
}

const commentsContainerStyle = {

    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '50px'


    
}

const max_characters = 3100

function Reader({books, match, updateReadingInfo, updateChapterLocation, currentChapter, retrieveCurrentChapter, setNextChapter, setPreviousChapter, userId, ...props}) {
    

    const [showCommentsState, setShowCommentsState] = useState(false)
    
    useEffect(() => {
        const bookId = match.params.bookId
        retrieveCurrentChapter(userId, bookId)
    }, [])

    const handleTurnNextChapter = () => {

    }

    const handleTurnNextPage = () => {

        const stillHasText = currentChapter.current_word + max_characters < currentChapter.content.length
        // if there is still text left in this chapter, show the next slice of text, and update backend
        if (stillHasText) {
           // updateChapterLocation
           const newCharacterIndex = currentChapter.current_word + max_characters
           updateChapterLocation('currentChapter', newCharacterIndex) 
           // updateReadingInfo 
        
        }

        // else go to the next chapter, update backend
       
    }

    
    const handleTurnPreviousPage = () => {

    }


    return (
       

        <Container style={readerContainerStyles}>
             { currentChapter.content && console.log("content.length", currentChapter.content.length)}
            
  <Row>
    <Col> 
    
     {currentChapter.number && currentChapter.number > 1 && <Button>
     
      <Button.Content visible>
        <Icon name='arrow left' />
      </Button.Content>
     </Button> }
    
    </Col>
    <Col style={readerStyles}>
    <h2 id="chapter-title">{currentChapter.content && currentChapter.title}</h2>
    <div id="chapter-content">{currentChapter.content && currentChapter.content.substring(currentChapter.current_word, currentChapter.current_word + max_characters)}</div>
    
    </Col>
    <Col>
     {console.log("current chapter", currentChapter)} 
     {currentChapter.number && (currentChapter.number < getBookByChapter(books, currentChapter.book_id).chapter_count)  &&  <Button>
    <Button.Content onClick={handleTurnNextPage} visible>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>}
    </Col>
  </Row>
  <Row style={commentsContainerStyle}>
      <Col></Col>
      <Col> { currentChapter.content && calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters) > 99  && <Button basic color='blue' onClick={() => setShowCommentsState(!showCommentsState)}>
      {showCommentsState ? 'Hide': 'Show'} Comments
     </Button>}
     </Col>
      <Col></Col>
  </Row>
</Container>
       
      
      
       
         
       
       
      )
}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks,
        currentChapter: state.currentChapter.currentChapter,
        userId: state.auth.userId
    }
 }
 
 const mapDispatchToProps = (dispatch) => {

      return {

        startReader: () => dispatch(startReader()), 
        endReader: () => dispatch(endReader()),
        retrieveCurrentChapter: (userId, bookId) => dispatch(retrieveCurrentChapter(userId, bookId)),
        setNextChapter: (chapter) => dispatch(setNextChapter(chapter)),
        setPreviousChapter: (chapter) => dispatch(setPreviousChapter(chapter)),
        updateChapterLocation: (chapter, newCurrentWord) => dispatch(updateChapterLocation(chapter, newCurrentWord)),
        updateReadingInfo: (userId, bookId, chapterStoreName, newCurrentChapter, newCurrentWord) => dispatch(updateReadingInfo(userId, bookId, chapterStoreName, newCurrentChapter, newCurrentWord))
    


      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Reader)