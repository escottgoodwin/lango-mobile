import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
const moment = require('moment')

import ButtonColor from '../components/ButtonColor'

const ChallengeRow = (props) =>

  <View style={styles.choices}>

  <TouchableOpacity style={styles.touch}
  onpress={() => props.navigation.navigate('Challenge',{ challengeId: props.challenge.id })}
  >
  <Text>Challenge: {props.challenge.challenge} </Text>
  <Text>{props.challenge.addedBy.firstName} {props.challenge.addedBy.lastName}</Text>
  <Text>{moment(props.challenge.addedDate).calendar()}</Text>

  </TouchableOpacity>

  </View>

const styles = StyleSheet.create({
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    width: 300,
    margin:5,
    backgroundColor:"white",
    borderColor:"#e4fef1",
    borderRadius:5,
    padding:3
  }
})

export default ChallengeRow
