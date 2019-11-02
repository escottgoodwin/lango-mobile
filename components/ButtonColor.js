import React from 'react'
import { Dimensions,View } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'

const ButtonColor = (props) =>
<View style={{width: Dimensions.get('window').width * .8,margin:10}}>
  <Button
    raised
    title={props.title}
    buttonStyle={{
    backgroundColor: props.backgroundcolor,
    height: 45,
    borderColor: "transparent",
    borderRadius: 10,
    }}
    onPress={props.onpress}
  />

  </View>
  ButtonColor.propTypes = {
    title: PropTypes.string.isRequired,
    backgroundcolor: PropTypes.string.isRequired,
    onpress: PropTypes.func.isRequired
  }

export default ButtonColor
