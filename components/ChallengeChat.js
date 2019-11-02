import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Button,Card } from 'react-native-elements'
const moment = require('moment')

import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"

import {
        ADD_CHALLENGE_MESSAGE_MUTATION,
        CHALLENGE_MESSAGE_QUERY,
        CHALLENGE_MESSAGE_SUBSCRIPTION
        } from '../ApolloQueries'

import ButtonColor from '../components/ButtonColor'
import SpinnerLoading1 from '../components/SpinnerLoading1'
import ErrorComponent from '../components/ErrorComponent'
import QAList from '../components/QAList'
import ChallengeMessageList from '../components/ChallengeMessageList'
import ChallengeMessageRow from '../components/ChallengeMessageRow'

export default class ChallengeChat extends React.Component {

  static navigationOptions = {
    title: 'Challenge Answer'
  }

    state = {
      challengeMessage:'',
      count:'',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
      challengeMessages:[],
    }

  render() {
    const { challengeId } = this.props
    const { challengeMessage, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

    return (
      <View >

            <Query query={CHALLENGE_MESSAGE_QUERY} variables={{ challengeId: challengeId }} fetchPolicy="cache-and-network">
                  {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <SpinnerLoading1 />
                    if (error) return <ErrorComponent {...error}/>

                    const challengeMessages = data.challengeMessages

                return (
                  <>
                  <ChallengeMessageList {...challengeMessages}
                  subscribeToNewChallengeMessage={() =>
                    subscribeToMore({
                      document: CHALLENGE_MESSAGE_SUBSCRIPTION,
                      variables: {challengeId: challengeId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        const newChallengeMsg = subscriptionData.data.challengeMsg.node
                        return  Object.assign({}, prev, {
                          challengeMessages: {
                            challengeMessages: [...prev.challengeMessages.challengeMessages, newChallengeMsg],
                            __typename: prev.challengeMessages.__typename
                        }
                        })
                      }
                    })
                  }

                  />

            <TextInput
              placeholder='Challenge Message'
              style={{height: 40,width: 320, backgroundColor:'white',borderRadius: 10,borderColor: 'darkgrey',margin:5,padding:10}}
              onChangeText={(text) => this.setState({challengeMessage:text})}
              multiline={true}
              numberOfLines={2}
              value={this.state.challengeMessage}
             />

             {isVisibleGraph && <ErrorMutation error={this.state.graphQLError} />}

             {isVisibleNet && <ErrorMutation error={this.state.networkError} />}

            <View style={{padding:10,alignItems:'center'}} >
             <Mutation
                 mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
                 variables={{ challengeId: challengeId, challengeMessage:challengeMessage }}
                 onCompleted={data => this._confirm(data)}
                 onError={error => this._error (error)}
                 >
                 {mutation => (
                   <ButtonColor
                   title="Send"
                   backgroundcolor="#282828"
                   onpress={mutation}
                   />
                 )}
               </Mutation>
              </View>
               </>
             )
             }}
             </Query>

      </View>
      )
    }

  _error = async error => {

      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

      error.networkError &&
        this.setState({ isVisibleNet: true, networkError: error.networkError.message})

  }

  _confirm = (data) => {
    const { id } = data
    this.setState({challengeMessage:''})
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
