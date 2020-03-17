import React, {useState} from 'react'
import {Dropdown} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAllCategories, createBootstrapDropDownItems} from '../utilities/helpers'
import {setFilterUserBooksValue, setSortUserBooksValue} from '../actions/library'


function LibraryControls({books, sort, sortBooks, filterBooks, ...props}) {

  const [dropdownFilterState, setDropdownFilterState] = useState("none")

  const [dropdownSortState, setDropdownSortState] = useState("title")
    
  const handleSelectFilter = (e) => {
        setDropdownFilterState(e) 
        filterBooks(e === 'none' ? []:[e])
  }

  const handleSortFilter = (e) => {
    setDropdownSortState(e) 
    sortBooks({property: e, ascending: sort.ascending})
  }

  

  const categories = getAllCategories(books)

   
    
    return <div>

<Dropdown onSelect={(e) => handleSelectFilter(e)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    Filter By: {dropdownFilterState}
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu" title="dropdown-button">
  <Dropdown.Item as="button" eventKey="none">None</Dropdown.Item>
    {createBootstrapDropDownItems(categories)}
    
  
  </Dropdown.Menu>
</Dropdown>

<Dropdown onSelect={(e) => handleSortFilter(e)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    Sort By: {dropdownSortState}
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu" title="dropdown-button">
  <Dropdown.Item as="button" eventKey="title">Title</Dropdown.Item>
  <Dropdown.Item as="button" eventKey="recent_add_to_library">Add To Library Date</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

    </div>

}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks,
        filter: state.library.displayOptions.filter,
        sort: state.library.displayOptions.sort
    }
 }
 
 const mapDispatchToProps = (dispatch) => {
      return {
        filterBooks: (e) => dispatch(setFilterUserBooksValue(e)),
        sortBooks: (e) => dispatch(setSortUserBooksValue(e))
      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LibraryControls)