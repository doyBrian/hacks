import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageNegative = (props) => (
  <Message error = {props.error} color = 'red'>
    <Message.Header>Action Forbidden</Message.Header>
    <p>Please enter a vaild email address.</p>
  </Message>
)

export default MessageNegative