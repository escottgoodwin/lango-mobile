import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const ReviewChoice = (props) =>

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
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:5
  }
});

export default ReviewChoice
