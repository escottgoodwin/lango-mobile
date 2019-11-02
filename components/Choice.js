import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'

const Choice = (props) =>

  <View style={styles.choices}>

  <TextInput
  placeholder={props.placeholder}
  style={styles.input}
  onChangeText={props.changetext}
  value={props.choiceValue}
  />

  <CheckBox
  center
  checked={props.choiceCorrect}
  onPress={props.changecheck}
  />

  </View>

const styles = StyleSheet.create({
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    height: 40,
    width: "80%",
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:5
  },
})

export default Choice
