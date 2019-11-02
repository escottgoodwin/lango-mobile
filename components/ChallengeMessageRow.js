import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const moment = require('moment')

const ChallengeMessageRow = (props) =>

    <View style={styles.choice}>
    <Text style={{fontSize:14,marginBottom:3}}>{props.challengeMessage}</Text>
    <Text style={{fontSize:11,color:'darkgray'}}>{props.addedBy.firstName} {props.addedBy.lastName} {moment(props.addedDate).calendar()}</Text>
    </View>

export default ChallengeMessageRow


const styles = StyleSheet.create({
  choice:{
    minHeight: 50,
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
  }
})
