import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-native-elements'

const AnsweredChoice = (props) =>

  <View style={styles.choice}>
  {props.correct ?
    <Icon
      name='check-square'
      type='font-awesome'
      color='#4AC948'
       />
     :
     <Icon
       name='times-circle'
       type='font-awesome'
       color='#ff0000'
        />
  }

  <Text style={{padding:10}} >
    {props.choice}
  </Text>

  </View>

const styles = StyleSheet.create({
  choice:{
    flexDirection:"row",
    alignItems: 'center',
    backgroundColor:'white',
    padding:10,
    margin:10,
    borderRadius: 5,
    minWidth:'85%'
  },
})

export default AnsweredChoice
