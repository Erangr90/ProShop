// React packages
import React from 'react'
// Components
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (


        <Card className='my-3 p-3 rounded'>
            <a href={'/products/'+product._id}>
                <Card.Img src={product.image}/>
            </a>

        <Card.Body>

            <a href={'/products/'+product._id}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as='div'>

                {/* <div className='my-3'>
                    {product.rating} from {product.numReviews} reviews
                </div> */}

                <Rating value={product.rating} text={product.numReviews + ' reviews'} />

            </Card.Text>

            <Card.Text as='h3'>${product.price}</Card.Text>




        </Card.Body>

        </Card>
    )
}

export default Product