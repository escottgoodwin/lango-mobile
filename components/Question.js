import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, FlatList, TouchableOpacity} from 'react-native'
import { Button,Card } from 'react-native-elements'

const Question = (props) =>

<Card title={selectiontext} containerStyle={{height: 320}} >

<Text style={styles.question} >
  {props.question}
</Text>

<FlatList
data={props.choices}
renderItem={
  ({ item, index }) => (
    <TouchableOpacity
    onPress={() => this.setState({selected:item.value})}>
     <Text style={styles.questionItem} >{item.value} {item.text} </Text>
    </TouchableOpacity>
  )
}
keyExtractor={item => item.text}
/>
</Card>


const styles = StyleSheet.create({
  question:{
    width: 250,
    fontWeight:'bold',
    fontSize:18,
    color:'#282828'
  },
  questionItem: {
    width: 250,
    fontSize:18,
    margin:10,
    color:'#282828'
  }
})

export default Question
