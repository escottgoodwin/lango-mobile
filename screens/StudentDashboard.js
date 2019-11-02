import React from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Query, } from "react-apollo"
import { container } from '../css'
import moment from 'moment'

import  { LOGOUT_MUTATION } from '../ApolloQueries'

  const removeToken = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('auth_token')

    return 
  }

class CurrentRecommendations extends React.Component {

    state = {
      user: '',
      date:null,
      lang:'',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
    }

  static navigationOptions = {
    title: 'Student Dashboard',
    headerLeft: null
  }

  signOut = (props) => {
    firebase.auth().signOut().then(function() {
      

    }).catch(function(error) {
      console.log(error)
    })
  
      const {uid} = this.state
      removeToken()
      const result = axios({
        
        url: 'https://us-central1-langolearn.cloudfunctions.net/api',
        method: 'post',
        data: {
            query: LOGOUT_MUTATION,
            variables: { uid }
        }
      }).then((result) => {
          return result
      })
      .catch(function(error) {
        console.log(error)
      })

      console.log(result)

      this.props.navigation.navigate('SignIn')
  }

  componentDidMount = async () => {
    const user1 = await AsyncStorage.getItem('user')
    const user = JSON.parse(user1)
    this.setState({user})

    const now = new Date()
    this.setState({lang:now})
  }


 render() {

  const { user, date, lang, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  console.log(user)
    return (
      <View style={styles.container}>
      <ScrollView>

        <>
                    
        <View>
        <Text>
          {user.name}
          </Text>
          <Text>
            German French English Spanish
          </Text>
        </View>

        <View >

        <Query  query={ARTICLE_REC_DATE_QUERY}
              fetchPolicy={'cache-and-network'}
              variables={{ lang, date }}  >
            {({ loading, error, data }) => {
            if (loading) return <div  >Loading...</div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { articleRecommendationsHistory } = data
 
            return (

              <FlatList
                data={articleRecommendationsHistory}
                renderItem={
                  ({ item }) => (
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Article',{ art_id })}>
                    <Text style={{fontSize:12,marginBottom:3}} >
                      {moment(item.date).format('MMMM Do YYYY')}
                    </Text>
                    <Text style={{fontSize:18,marginBottom:3}} >
                      {item.title}
                    </Text>

                    </TouchableOpacity>

                  )
                }
                keyExtractor={item => item.art_id}
          />
              

              )
            }}
         </Query>


        </View>

        <View style={{padding:15,alignItems:'center'}}>
        
        <Button
        title="Sign Out"
        />
        </View>
        </>
  
      </ScrollView>
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
    console.log(data)
    removeToken()
    this.props.navigation.navigate('SignOut')
    }
}

const styles = StyleSheet.create({
  container
})

export default StudentDashboard
