import React, {useState} from 'react'
import {Dropdown, Row, Col} from 'react-bootstrap'
import { Input } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getAllCategories, createBootstrapDropDownItems, mapSortPropertyToSortLabel} from '../../utilities/helpers'
import {setFilterUserBooksValue, setSortUserBooksValue, searchAndFilterLibrary} from '../../actions/library'


function LibraryControls({books, sort, filter, sortBooks, filterBooks, searchBooks, ...props}) {

  const [dropdownFilterState, setDropdownFilterState] = useState("none")

  const handleSelectFilter = (e) => {
        setDropdownFilterState(e) 
        filterBooks(e === 'none' ? []:[e])
  }
  
  const handleSortFilter = (e) => {
    sortBooks({property: e, ascending: sort.ascending})
  }

  const handleAscendingFilter = (e) => {
    sortBooks({property: sort.property, ascending: e === "true" ? true : false })
  }

  const handleSearch = (e) => {

       searchBooks(e.target.value)
        
  } 

  

  const categories = getAllCategories(books)

   
    
    return <div>
<Row>
  <Col>
<Dropdown onSelect={(e) => handleSelectFilter(e)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    Filter By: {dropdownFilterState}
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu1" title="dropdown-button1">
  <Dropdown.Item as="button" eventKey="none">None</Dropdown.Item>
    {createBootstrapDropDownItems(categories)}
    
  
  </Dropdown.Menu>
</Dropdown>
</Col>
<Col>
<Dropdown onSelect={(e) => handleSortFilter(e)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    Sort By: {mapSortPropertyToSortLabel(sort.property)}
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu2" title="dropdown-button2">
  <Dropdown.Item as="button" eventKey="title">Title</Dropdown.Item>
  <Dropdown.Item as="button" eventKey="last_added_to_library">Add To Library Date</Dropdown.Item>
  <Dropdown.Item as="button" eventKey="last_read">Last Read Date</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</Col>


<Col>
<Dropdown onSelect={(e) => handleAscendingFilter(e)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic" >
    {sort.ascending ? "Ascending" : "Descending" }
  </Dropdown.Toggle>

  <Dropdown.Menu id="dropdown-item-menu3" title="dropdown-button3">
  <Dropdown.Item as="button" eventKey="true">Ascending</Dropdown.Item>
  <Dropdown.Item as="button" eventKey="false">Descending</Dropdown.Item>
  
  </Dropdown.Menu>
</Dropdown>
</Col>
  
<Col>

<Input onChange={handleSearch} placeholder="Search Library" icon="search" value={filter.titleSearch} />

</Col>



</Row>




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
        sortBooks: (e) => dispatch(setSortUserBooksValue(e)),
        searchBooks: (e) => dispatch(searchAndFilterLibrary(e))
      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LibraryControls)