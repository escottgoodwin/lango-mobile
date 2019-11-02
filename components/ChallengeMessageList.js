import React from 'react'
import { Text, View } from 'react-native'
const moment = require('moment')

import ChallengeMessageRow from './ChallengeMessageRow'

export default class ChallengeMessageList extends React.Component {

  componentDidMount() {
    this.props.subscribeToNewChallengeMessage()
  }

  render() {

    return (
  <View style={{alignItems:'center',margin:5}}>
  <Text>Messages - {this.props.challengeMessages.length}</Text>

    {this.props.challengeMessages.map(item => <ChallengeMessageRow key={item.id} {...item}/>)}

  </View>
    )
  }
}
