// React packages
import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
// Redux packages
import {useDispatch, useSelector} from 'react-redux'
// Components
import Product from '../components/Product'
// Actions
import { ProductsList } from '../actions/productsActions'

const HomeScreen = () => {




    useEffect(()=>{


    },[] )

    return (
        <>
        <h1>Last products</h1>
        <Row>
            {products.map(product=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default HomeScreen
