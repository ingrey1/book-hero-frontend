import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {retrieveCurrentChapter, nextChapterTransition, retrieveNextChapter, updateChapterLocation, startReader, endReader, setNextChapter, setPreviousChapter, setCurrentChapter} from '../actions/currentChapter'
import {Row, Col, Container} from 'react-bootstrap'
import {Button, Icon, Progress} from 'semantic-ui-react'
import {updateReadingStatus} from '../api/api'
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

const progressContainerStyle = {
    marginTop: '15px',
    width: '20%',
    height: '20px'
}

const max_characters = 3100

function Reader({books, match, nextChapterTransition, previousChapter, nextChapter, updateChapterLocation, currentChapter, retrieveCurrentChapter, retrieveNextChapter, setNextChapter, setPreviousChapter, setCurrentChapter, userId, ...props}) {
    

    const [showCommentsState, setShowCommentsState] = useState(false)
    
    useEffect(() => {
        console.log("useEffect called for Reader")
        const bookId = match.params.bookId
        if (currentChapter && currentChapter.content && bookId === currentChapter.book_id) {
            // already have book, no need to retrieve
        } else {
            retrieveCurrentChapter(userId, bookId)
        }    
        
    }, [])

    useEffect(() => {
        checkAndRetrieveNextChapter()
    })



    const showPreviousButton = () => {

        return (currentChapter.number && (currentChapter.number > 1)) || stillHasPreviousText()

    }

    const showNextButton = () => {

        return (currentChapter.number && (currentChapter.number < getBookByChapter(books, currentChapter.book_id).chapter_count)) || stillHasNextText()

    }

    const stillHasNextText = () => {

        return currentChapter.content && ((currentChapter.current_word + max_characters) < currentChapter.content.length)
    }

    const stillHasPreviousText = () => {

        return (currentChapter.current_word - max_characters) > 0

    }

    const checkAndRetrieveNextChapter = () => {
        if (currentChapter.content && !nextChapter.content && calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters) > 1) {
            console.log("retrievenextChapter called")
            retrieveNextChapter(userId, currentChapter.book_id)
         }
    }
    

    const handleTurnNextPage = () => {

        console.log("handle next page clicked")
        // grab the next chapter if at least 50% through current chapter, and there is no next chapter
        
        
        // if there is still text left in this chapter, show the next slice of text, and update backend
        if (stillHasNextText()) {
           // updateChapterLocation
           const newCharacterIndex = currentChapter.current_word + max_characters
           updateChapterLocation('currentChapter', newCharacterIndex) 
           updateReadingStatus(userId, currentChapter.book_id, currentChapter.number, newCharacterIndex)
        } else {  // else go to the next chapter, update backend
            updateReadingStatus(userId, currentChapter.book_id, currentChapter.number + 1, 1)
            console.log("next chapter in handleTurnPage", nextChapter)
            nextChapterTransition(currentChapter, nextChapter, previousChapter, max_characters)
        }

       
       
    }

    
    const handleTurnPreviousPage = () => {
        console.log("handle previous page clicked")
        
        // if its not the first page
        if (stillHasPreviousText()) {
           // updateChapterLocation
           const newCharacterIndex = currentChapter.current_word - max_characters
           // updateReadingInfo 
           updateReadingStatus(userId, currentChapter.book_id, currentChapter.number, newCharacterIndex)
        
        } else {  // else go to the prev chapter, update backend

             // set next chapter to current chapter
             setNextChapter(currentChapter)
             // reset nextChapter's value to 1
             updateChapterLocation('nextChapter', 1)    
             // set current chapter to prev chapter 
             setCurrentChapter(previousChapter)
             updateChapterLocation('currentChapter', previousChapter.content.length - max_characters)
             // clear previousChapter
             setPreviousChapter({}) 
             // update reading record
             updateReadingStatus(userId, currentChapter.book_id, currentChapter.number, previousChapter.content.length - max_characters)

        }

       
       
    


    }


    return (
       

        <Container style={readerContainerStyles}>
             { currentChapter.content && console.log("content.length", currentChapter.content.length)}
            
  <Row>
    <Col> 
    
     {showPreviousButton() && <Button onClick={handleTurnPreviousPage}>
     
      <Button.Content  visible>
        <Icon name='arrow left' />
      </Button.Content>
     </Button> }
    
    </Col>
    <Col style={readerStyles}>
    <h2 id="chapter-title">{currentChapter.content && currentChapter.title}</h2>
    <div id="chapter-content">{currentChapter.content && currentChapter.content.substring(currentChapter.current_word, currentChapter.current_word + max_characters)}</div>
    {currentChapter.content && <div style={progressContainerStyle}><Progress percent={calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters)}>{calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters)}%</Progress></div>}
    </Col>
    <Col>
     {console.log("re-render reader")} 
     { showNextButton() &&  <Button onClick={handleTurnNextPage}>
    <Button.Content  visible>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>}
    </Col>
  </Row>
  <Row style={commentsContainerStyle}>
      <Col></Col>
      <Col> {currentChapter.content && calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters) > 99  && <Button basic color='blue' onClick={() => setShowCommentsState(!showCommentsState)}>
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
        nextChapter: state.currentChapter.nextChapter,
        previousChapter: state.currentChapter.previousChapter,
        userId: state.auth.userId
    }
 }
 
 const mapDispatchToProps = (dispatch) => {

      return {

        startReader: () => dispatch(startReader()), 
        endReader: () => dispatch(endReader()),
        retrieveCurrentChapter: (userId, bookId) => dispatch(retrieveCurrentChapter(userId, bookId)),
        retrieveNextChapter: (userId, bookId) => dispatch(retrieveNextChapter(userId, bookId)),
        setNextChapter: (chapter) => dispatch(setNextChapter(chapter)),
        nextChapterTransition: (current, next, prev, max) => dispatch(nextChapterTransition(current, next, prev, max)),
        setCurrentChapter: (chapter) => dispatch(setCurrentChapter(chapter)),
        setPreviousChapter: (chapter) => dispatch(setPreviousChapter(chapter)),
        updateChapterLocation: (chapter, newCurrentWord) => dispatch(updateChapterLocation(chapter, newCurrentWord))


      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Reader)