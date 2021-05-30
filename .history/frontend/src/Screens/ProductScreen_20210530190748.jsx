// React packages
import React from 'react'
import { Link } from 'react-router-dom'
// Components
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
// Data
import products from '../products'

const ProductScreen = ({match}) => {

    const product = products.find(p=> p._id === match.params.id)




    return (
        <>
            <Link className='btn btn-block btn-light my-3' to='/'>Go back</Link>
        </>
    )
}

export default ProductScreen