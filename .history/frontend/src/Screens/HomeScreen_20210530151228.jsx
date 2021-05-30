// React packages
import React from 'react'
import { Col, Row } from 'react-bootstrap'
// Components
import Product from '../components/Product'
// Data
import products from '../products'

const HomeScreen = () => {
    return (
        <>
        <h1>Last products</h1>
        <Row>
            {products.map(item=>(
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={item}/>
                </Col>
            ))}
        </Row>

        </>
    )
}

export default HomeScreen
