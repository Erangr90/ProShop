import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ item }) => {
    console.log(item)
    return (
        <Card className='my-3 p-3 rounded'>
            <Card.Image src={item.image}/>

        </Card>
    )
}

export default Product
