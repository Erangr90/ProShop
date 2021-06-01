// React packages
import React from 'react'
// Components
import { Alert } from 'react-bootstrap'

const Message = ({variant, text}) => {
    return (
        <Alert variant={variant}>{text}</Alert>
    )
}

Message.defaultProps = {
    variant:'info'
}

export default Message
