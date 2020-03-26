import React, {useState} from 'react'
import {List, Form, TextArea, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createAndSetComment} from '../actions/comments'

function Comments({comments, userId, chapterId, createComment, ...props}) {

    const [showAddCommentState, setShowAddCommentState] = useState(false)
    const [commentTextState, setCommentTextState] = useState("")

    const handleCommentTextChange = (e) => {
        setCommentTextState(e.target.value)
    }

    const handleCreateComment = () => {
      createComment(userId, bookId, chapterId, commentTextState)
    }

    return <div><Button onClick={() => setShowAddCommentState(!showAddCommentState)} color="teal">Toggle Comment Box</Button> 
         {showAddCommentState &&  <Form>
    <TextArea value={commentTextState} onChange={handleCommentTextChange} placeholder='Write a comment' />
    <Button onClick={handleCreateComment} color="teal">Submit Comment</Button>
  </Form>}
        <List>
         <List.Header>Comments</List.Header>
         {comments.map(comment => {
         
         return <List.Item>
               
               <p>comment.content</p>
                

         </List.Item>})}

    </List>

    </div>
    

}

const mapStateToProps = state => {
    return {
        comments: state.comments,
        userId: state.auth.userId,
        chapterId: state.currentChapter.id,
        bookId: state.currentChapter.book_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createComment: (userId, bookId, chapterId, content) => dispatch(createAndSetComment(userId, bookId, chapterId, content))
    }
}




export default connect(mapStateToProps)(Comments)