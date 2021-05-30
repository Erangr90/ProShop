import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ item }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={'/products/'+item._id}>
                <Card.Image src={item.image} variant='top'/>
            </a>

        </Card>
    )
}

export default Product
