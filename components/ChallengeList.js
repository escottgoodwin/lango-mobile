import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'

import { Query } from "react-apollo"

const moment = require('moment')

import {CHALLENGE_QUESTION_QUERY} from '../ApolloQueries'

import SpinnerLoading1 from '../components/SpinnerLoading1'
import ErrorComponent from '../components/ErrorComponent'

export default class ChallengeList extends React.Component {

  render() {

    const { navigation } = this.props

    return(
      <Query query={CHALLENGE_QUESTION_QUERY} variables={{ questionId: this.props.questionToRender.question.id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <SpinnerLoading1 />
              if (error) return <ErrorComponent {...error}/>

              const challengesToRender = data.challenges.challenges

          return (

            <FlatList
            data={challengesToRender}
            renderItem={
              ({ item, index }) => (

                <TouchableOpacity style={styles.choice}
                 onPress={() => navigation.navigate('Challenge',{ challengeId: item.id })}
                 >
                 <View style={{margin:10}}>
                 <Text style={{fontSize:14,marginBottom:3}}>{item.challenge} </Text>
                 <Divider style={{ width:'100%',height:1,backgroundColor: 'darkgray',marginBottom:3,marginTop:3 }} />
                 <Text style={{fontSize:11,color:'darkgray'}}>{item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}</Text>
                 </View>
                 </TouchableOpacity>

              )
            }
            keyExtractor={item => item.id}
          />

    )
  }}
  </Query>

    )
  }
}

const styles = StyleSheet.create({
  choice:{
    minHeight: 50,
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
  }
})
