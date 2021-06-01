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

    const dispatch = useDispatch()

    const productsList = useSelector(state => state.productsList)
    const {loading, products,error} = productsList

    useEffect(()=>{

        dispatch(ProductsList())


    },[dispatch] )

    return (
        <>
        <h1>Last products</h1>
        {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : <Row>
            {products.map(product=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row> }
        </>
    )
}

export default HomeScreen
