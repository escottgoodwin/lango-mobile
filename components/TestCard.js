import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

const TestCard = (props) =>

<TouchableOpacity style={{margin:10}} onPress={props.onpress} >
<Card title={props.title} containerStyle={styles.card}>
<Text style={styles.instructions}>Questions Total: {props.question_total} </Text>
<Text style={styles.instructions}>Correct: {props.correct} </Text>
</Card>
</TouchableOpacity>

const styles = StyleSheet.create({
  card:{
    width: '80%'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  }
})

export default TestCard
