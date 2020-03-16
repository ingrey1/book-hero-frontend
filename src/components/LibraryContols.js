import React, {useEffect} from 'react'
import {Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAllCategories, createBootstrapDropDownItems} from '../utilities/helpers'


function LibraryControls({books,...props}) {
    
    const categories = getAllCategories(books)
    
    return <div>

<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Filter By Category
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu" title="dropdown-button">
    {createBootstrapDropDownItems(categories)}
    <Dropdown.Item as="button" active>Fantasy</Dropdown.Item>
  
  </Dropdown.Menu>
</Dropdown>

    </div>

}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks
    }
 }
 
 const mapDispatchToProps = (dispatch) => {
      return {
 
      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LibraryControls)