// React packages
import React from 'react'
// Components
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animated ='border' role='status' style={{width:'100px', height:'100px',margin:'auto', display:'block'}}>
        <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
