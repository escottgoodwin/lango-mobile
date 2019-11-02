import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Button, CheckBox } from 'react-native-elements'

const AnswerChoice = (props) =>

  <View style={styles.choices}>

  <Text>
  {props.choice}
  </Text>

  <CheckBox
    center
    checked={props.checked}
    onPress={props.toggleCheckbox}
  />

  </View>

const styles = StyleSheet.create({
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Choice.propTypes = {
  placeholder: PropTypes.string.isRequired,
  changetext: PropTypes.func.isRequired
}

export default AnswerChoice
