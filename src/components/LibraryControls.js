import React, {useState} from 'react'
import {Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAllCategories, createBootstrapDropDownItems} from '../utilities/helpers'
import {setFilterUserBooksValue} from '../actions/library'


function LibraryControls({books, filterBooks, ...props}) {

  const [dropdownState, setDropdownState] = useState("none")
    
  const handleSelect = (e) => {
        setDropdownState(e) 
        filterBooks(e === 'none' ? []:[e])
    }

    const categories = getAllCategories(books)

   
    
    return <div>

<Dropdown onSelect={(e) => handleSelect(e)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    Filter By: {dropdownState}
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu" title="dropdown-button">
  <Dropdown.Item as="button" eventKey="none">None</Dropdown.Item>
    {createBootstrapDropDownItems(categories)}
    
  
  </Dropdown.Menu>
</Dropdown>

    </div>

}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks,
        filter: state.library.displayOptions.filter
    }
 }
 
 const mapDispatchToProps = (dispatch) => {
      return {
        filterBooks: (e) => dispatch(setFilterUserBooksValue(e))
      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LibraryControls)