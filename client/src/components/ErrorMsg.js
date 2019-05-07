import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageNegative = (props) => (
  <Message error = {props.error} color = 'red'>
    <Message.Header>Action Forbidden</Message.Header>
    <p>Input invalid. Try again.</p>
  </Message>
)

export default MessageNegative