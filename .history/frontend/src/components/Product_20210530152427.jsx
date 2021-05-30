import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ item }) => {
    console.log(item)
    return (
        <Card className='my-3 p-3 rounded'>
            {item._id}

        </Card>
    )
}

export default Product
