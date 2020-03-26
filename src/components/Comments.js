import React, {useState} from 'react'
import {List, Form, TextArea, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

function Comments({comments, ...props}) {

    const [showAddCommentState, setShowAddCommentState] = useState(false)
    const [commentTextState, setCommentTextState] = useState("")

    const handleCommentTextChange = (e) => {
        setCommentTextState(e.target.value)
    }

//     return <div><Button onClick={() => setShowAddCommentState(!showAddCommentState)} color="teal">Toggle Comment Box</Button> 
//          {showAddCommentState &&  <Form>
//     <TextArea value={commentTextState} onChange={handleCommentTextChange} placeholder='Write a comment' />
//     <Button color="teal">Submit Comment</Button>
//   </Form>}
//         <List>
//          <List.Header>Comments</List.Header>
//          {comments.map(comment => {
         
//          return <List.Item>
               
//                <p>comment.content</p>
                

//          </List.Item>})}

//     </List>

//     </div>
    

 return <div>comments</div>
}

const mapStateToProps = state => {
    return {
        comments: state.comments
    }
}




export default connect(mapStateToProps)(Comments)