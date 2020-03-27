import React, {useState, useEffect} from 'react'
import {List, Form, TextArea, Button, Message} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {retrieveAndSetComments, createAndSetComment} from '../actions/comments'


const buttonStyle = {
    margin: '25px'
}

const commentStyle = {
    width: '100%'
}

function Comments({comments, setComments, userId, chapterId, bookId, createComment, ...props}) {

    const [showAddCommentState, setShowAddCommentState] = useState(false)
    const [commentTextState, setCommentTextState] = useState("")
   
    useEffect(() => {
         if (userId && bookId && chapterId) {
            setComments(userId, bookId, chapterId)
         }
         
    }, [chapterId])

    const handleCommentTextChange = (e) => {
        setCommentTextState(e.target.value)
    }

    const handleCreateComment = () => {
       // (token, userId, bookId, chapterId, content)  
      createComment(userId, bookId, chapterId, commentTextState)
      setCommentTextState("")
      setShowAddCommentState(false)
    }

    return <div><Button style={buttonStyle} onClick={() => setShowAddCommentState(!showAddCommentState)} color="teal">Toggle Comment Box</Button> 
         {showAddCommentState &&  <Form>
    <TextArea value={commentTextState} onChange={handleCommentTextChange} placeholder='Write a comment' />
    <Button  style={buttonStyle} onClick={handleCreateComment} color="teal">Submit Comment</Button>
  </Form>}
        <List>
         <List.Header as="h2">Comments</List.Header>
         {console.log("comments value in Comments", comments)}
         {comments && comments.map(comment => {
         
         return <List.Item style={commentStyle}>
               
         <Message>{comment.content} - {comment.user.username ? comment.user.username : comment.user.email.split("@")[0]} </Message>
                

         </List.Item>})}

    </List>

    </div>
    

}

const mapStateToProps = state => {
    return {
        comments: state.comments,
        userId: state.auth.userId,
        chapterId: state.currentChapter.currentChapter.id,
        bookId: state.currentChapter.currentChapter.book_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (userId, bookId, chapterId, content) => dispatch(createAndSetComment(userId, bookId, chapterId, content)),
        setComments: (userId, bookId, chapterId) => dispatch(retrieveAndSetComments(userId, bookId, chapterId))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Comments)