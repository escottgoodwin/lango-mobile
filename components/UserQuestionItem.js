import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Divider } from 'react-native-elements'
import PropTypes from 'prop-types'

const UserQuestionItem = (props) =>

  <View style={styles.choice} >

   <Text style={{fontSize:16,margin:10}}>{props.question}</Text>

   {props.choices.map(choice => choice.correct ?
     <Text key={choice.id} style={styles.correct}>{choice.choice}</Text>
     :
     <Text key={choice.id} style={styles.incorrect}>{choice.choice}</Text>)}

   <Divider style={{ backgroundColor: '#D3D3D3' }} />

   <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >

   <Text style={{fontSize:14,margin:10}} >
   Number: {props.questionAnswers.length}
   </Text>

   <Text style={{fontSize:14,margin:10}} >
   Correct: {props.questionAnswers.filter(answer => answer.answerCorrect).length}
   </Text>

   <Text style={{fontSize:14,margin:10}} >
   {
     props.questionAnswers.filter(answer =>
       answer.answerCorrect).length / props.questionAnswers.length > 0 ?
       Math.round(props.questionAnswers.filter(answer => answer.answerCorrect).length / props.questionAnswers.length*100)
       :
       0
   }%
   </Text>

   </View>

  </View>

  const styles = StyleSheet.create({
    choice:{
      backgroundColor:'white',
      padding:10,
      margin:10,
      borderRadius:5
    },
    correct:{
      fontSize:14,
      color:'green',
      margin:10,
    },
    incorrect:{
      fontSize:14,
      margin:10,
    }
  });


export default UserQuestionItem
