// React packages
import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {


    return (
        <div>
            <Card className='my-3 py-3 rounded'>
                <a href={product._id}>
                    <Card.Image src={product.image} variant='top' />
                </a>

            {/* <Card.Body>
                <a href={product._id}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as='div' className='my-3'>
                    {product.rating} from {product.numReviews} Reviews
                </Card.Text>

                <Card.Text as='h3'>${product.price}</Card.Text>

            </Card.Body> */}

            </Card>
        </div>
    )
}

export default Product
