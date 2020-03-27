import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {retrieveCurrentChapter, previousChapterTransition, nextChapterTransition, retrieveNextChapter, retrievePreviousChapter, updateChapterLocation, startReader, endReader, setNextChapter, setPreviousChapter, setCurrentChapter, setTextSize} from '../actions/currentChapter'
import {Row, Col, Container} from 'react-bootstrap'
import { Dimmer, Loader} from 'semantic-ui-react'
import {Button, Icon, Progress} from 'semantic-ui-react'
import {updateReadingStatus, getNextChapter, getPreviousChapter} from '../api/api'
import {getBookByChapter, calculatePercentOfChapterForCurrentPage} from '../utilities/helpers'
import Comments from './Comments'
import {retrieveAndSetComments} from '../actions/comments'
import ReadingMenu from './ReadingMenu'


function calculateTotalCharacters(textSize) {
    if (textSize === 24) return 1150
    else if (textSize === 36) return 520
    else return 270
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

const colReaderStyles = {

    minWidth: '700px',
    maxWidth: '700px'

}



function Reader({books, textSize, setComments, match, nextChapterTransition, previousChapterTransition, previousChapter, nextChapter, updateChapterLocation, currentChapter, retrieveCurrentChapter, retrieveNextChapter, setNextChapter, setPreviousChapter, setCurrentChapter, userId, ...props}) {
    
    const max_characters = calculateTotalCharacters(textSize)

    const [readerStyles, setReaderStyles] = useState({
        fontSize: 24
    })


    const [showCommentsState, setShowCommentsState] = useState(false)
    
    useEffect(() => {
        console.log("useEffect called for Reader")
        const bookId = match.params.bookId
        const token = localStorage.getItem('fire_token')
        if (currentChapter && currentChapter.content && bookId === currentChapter.book_id) {
            // already have book, no need to retrieve
            //setComments(userId, currentChapter.book_id, currentChapter.id)
            // get previous chapter
            if (currentChapter.number !== 1) {
                getPreviousChapter(userId, bookId, token).then(res => res.json()).then(data => {
                    console.log('getprevchapter')
                   if (!data.errors && !data.complete) { // all good, have chapter
                       
                       setPreviousChapter(data)
       
                   } else { // handle errors; display message to inform user couldnt retrieve current chapter
       
                   }
               }).catch(err => console.log(err)) 
            }
        } else {

            retrieveCurrentChapter(userId, bookId).then(()=> {
               // setComments(userId, currentChapter.book_id, currentChapter.id)
            })
            getPreviousChapter(userId, bookId, token).then(res => res.json()).then(data => {
                console.log('getprevchapter')
               if (!data.errors && !data.complete) { // all good, have chapter
   
                   setPreviousChapter(data)
   
               } else { // handle errors; display message to inform user couldnt retrieve current chapter
   
               }
           }).catch(err => console.log(err)) 
           
        }    
        
    }, [])

    useEffect(() => {
       setReaderStyles({
        ...readerStyles,   
        fontSize: textSize
    })
    }, [textSize])





    const showPreviousButton = () => {

        return (currentChapter.number && (currentChapter.number > 1)) || stillHasPreviousText()

    }

    const showNextButton = () => {
        if (currentChapter.number !== undefined) {
            return (currentChapter.number < (getBookByChapter(books, currentChapter.book_id).chapter_count)) || stillHasNextText()
        }
    }

    const stillHasNextText = () => {

        return currentChapter.content && ((currentChapter.current_word + max_characters) < currentChapter.content.length)
    }

    const stillHasPreviousText = () => {

        
        return currentChapter.current_word > 1

    }


    

    const handleTurnNextPage = async () => {

        console.log("handle next page clicked")
        // grab the next chapter if at least 50% through current chapter, and there is no next chapter
        
        const token = localStorage.getItem('fire_token')
        // if there is still text left in this chapter, show the next slice of text, and update backend
        if (stillHasNextText()) {
           const newCharacterIndex = currentChapter.current_word + max_characters
           updateChapterLocation('currentChapter', newCharacterIndex) 
           updateReadingStatus(userId, currentChapter.book_id, token, newCharacterIndex, currentChapter.number)
        } else {  // else go to the next chapter, update backend
            updateReadingStatus(userId, currentChapter.book_id, token, 1, currentChapter.number).then(() => {
              
                // retrieveNextChapter(userId, currentChapter.book_id).then(() => {
                //     nextChapterTransition(currentChapter, nextChapter, previousChapter, max_characters)
                // })
                getNextChapter(userId, currentChapter.book_id, token).then(res => res.json()).then(data => {
                    if (!data.errors) { // all good, have chapter
                        console.log("data from getNextChapter", data)
                        setNextChapter(data)
                        const maxCharPrevChap = currentChapter.content.length - max_characters
                        nextChapterTransition(currentChapter, data, maxCharPrevChap )
                    }
            })
            console.log("next chapter in handleTurnPage", nextChapter)
        })

        
    }
       
    }

    
    const handleTurnPreviousPage = () => {
        console.log("handle previous page clicked")
        const token = localStorage.getItem('fire_token')
        // if its not the first page
        if (stillHasPreviousText()) {
           // updateChapterLocation
           const newCharacterIndex = (currentChapter.current_word - max_characters) < 1 ? 1 : (currentChapter.current_word - max_characters)
           // updateReadingInfo 
           console.log("handle previous turn page, still has text")
           updateReadingStatus(userId, currentChapter.book_id, token, newCharacterIndex, currentChapter.number)
           updateChapterLocation('currentChapter', newCharacterIndex)   
        
        } else {  // else go to the prev chapter, update backend

            updateReadingStatus(userId, currentChapter.book_id, token, currentChapter.content.length - max_characters, currentChapter.number - 1).then(() => {
              
                
              
                    getPreviousChapter(userId, currentChapter.book_id, token).then(res => res.json()).then(data => {
                    
                    
                        if (!data.errors) { // all good, have chapter
                        console.log("data from getprevChapter", data)
                        
                       
                        previousChapterTransition(currentChapter, previousChapter, data, max_characters)
                    }
            })
        
            
        })
        }

       
       
    


    }


    return (
       <div>

        {currentChapter.content ? <Container style={readerContainerStyles}>
             { currentChapter.content && console.log("content.length", currentChapter.content.length)}
            
  <Row>
    <Col> 
    
     {showPreviousButton() && <Button onClick={handleTurnPreviousPage}>
     
      <Button.Content  visible>
        <Icon name='arrow left' />
      </Button.Content>
     </Button> }
     
    
    </Col>
    <Col style={colReaderStyles}>
    <h2 id="chapter-title">{currentChapter.content && currentChapter.title}</h2>
    <div style={readerStyles} id="chapter-content">{currentChapter.content && currentChapter.content.substring(currentChapter.current_word, currentChapter.current_word + max_characters).split('\n\n').map(paragraph => {
        return <p>{paragraph}</p>
    })}</div>
    {currentChapter.content && <div style={progressContainerStyle}><Progress percent={calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters)}>{calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters)}%</Progress></div>}
    </Col>
    <Col>
     {console.log("show next button", currentChapter.number && (currentChapter.number < getBookByChapter(books, currentChapter.book_id).chapter_count))} 
     { showNextButton() &&  <Button onClick={handleTurnNextPage}>
    <Button.Content  visible>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>}
    </Col>
    <Col><ReadingMenu /></Col>
  </Row>
  <Row style={commentsContainerStyle}>
      <Col></Col>
      <Col> {currentChapter.content && calculatePercentOfChapterForCurrentPage(currentChapter.content, currentChapter.current_word + max_characters) > 99  && <Button basic color='blue' onClick={() => setShowCommentsState(!showCommentsState)}>
      {showCommentsState ? 'Hide': 'Show'} Comments
     </Button>}
     {showCommentsState && <Comments />}

     </Col>
      <Col></Col>
  </Row>
</Container>:(<Dimmer active>
        <Loader>Retrieving Library</Loader>
      </Dimmer>)}
      </div>)
}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks,
        currentChapter: state.currentChapter.currentChapter,
        nextChapter: state.currentChapter.nextChapter,
        previousChapter: state.currentChapter.previousChapter,
        userId: state.auth.userId,
        textSize: state.currentChapter.displayOptions.textSize
    }
 }
 
 const mapDispatchToProps = (dispatch) => {

      return {

        startReader: () => dispatch(startReader()), 
        endReader: () => dispatch(endReader()),
        setComments: (comments) => dispatch(retrieveAndSetComments(comments)),
        retrieveCurrentChapter: (userId, bookId) => dispatch(retrieveCurrentChapter(userId, bookId)),
        retrieveNextChapter: (userId, bookId) => dispatch(retrieveNextChapter(userId, bookId)),
        setNextChapter: (chapter) => dispatch(setNextChapter(chapter)),
        nextChapterTransition: (current, next, max) => dispatch(nextChapterTransition(current, next, max)),
        previousChapterTransition: (current, prev, newPrev, max) => dispatch(previousChapterTransition(current, prev, newPrev, max)),
        setCurrentChapter: (chapter) => dispatch(setCurrentChapter(chapter)),
        setPreviousChapter: (chapter) => dispatch(setPreviousChapter(chapter)),
        updateChapterLocation: (chapter, newCurrentWord) => dispatch(updateChapterLocation(chapter, newCurrentWord))


      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Reader)