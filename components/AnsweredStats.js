import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { Query } from "react-apollo"
import gql from "graphql-tag"

import {USER_ANSWERED_QUERY} from '../ApolloQueries'

import SpinnerLoading1 from '../components/SpinnerLoading1'
import ErrorComponent from '../components/ErrorComponent'

export default class AnsweredStats extends React.Component {

  render() {

    return(

      <Query query={USER_ANSWERED_QUERY} variables={{ testId: this.props.testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <SpinnerLoading1 />
              if (error) return <ErrorComponent {...error}/>

              const userAnsweredStats = data.userAnsweredStats

          return (

      <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('UserAnswers',{testId:this.props.testId})} >
      <Card title='Your Answers' containerStyle={{width: "90%"}}>
      <Text style={styles.instructions}>Questions Total: {userAnsweredStats.total} </Text>
      <Text style={styles.instructions}>Correct: {userAnsweredStats.totalCorrect} </Text>
      <Text style={styles.instructions}>Percent: {Math.round(userAnsweredStats.percentCorrect*100)}% </Text>
      </Card >
      </TouchableOpacity>

      )
    }}
    </Query>


    )
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  }
})
