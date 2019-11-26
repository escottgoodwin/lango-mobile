import React from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { Text, Button } from 'native-base';
import { container } from '../css'
import ArtRecPlaylist from '../components/ArtRecPlaylist'
import Loading from './Loading'

import { Query, } from "react-apollo"
import  { PLAYLIST_QUERY } from '../ApolloQueries'

class PlaylistRecommendations extends React.Component {

    state = {
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
    }

  static navigationOptions = {
    title: 'Playlist',
  }

 render() {
  const { navigation } = this.props

  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>

      <Query query={PLAYLIST_QUERY}
            fetchPolicy={'cache-and-network'}
          >
          {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return <div>{JSON.stringify(error)}</div>

          const { playList } = data

          return (
              <>
              <View>
                <Text style={{fontSize:22}}>
                 Playlist - {playList.length} Articles
                </Text>
              </View>

              <View style={{padding:15}}>
                <Button block success onPress={() => navigation.navigate('PlayListPlay',{ playList })}  >
                  <Text>Play</Text>
                </Button>
              </View>

              <ScrollView>
              <FlatList
                data={playList}
                renderItem={
                  ({ item }) => (
                    <ArtRecPlaylist {...item} props={this.props}/>
                  )
                }
                keyExtractor={item => item.art_id}
                />
                 </ScrollView>
                </>
              )
            }}
         </Query>

     

      <View style={{padding:15}}>
          <Button  block style={{backgroundColor:'#3A7891'}} onPress={() => navigation.navigate('ChooseLanguage')}  >
            <Text>Home</Text>
          </Button>
        </View>
      </View>

    )

  }

  _error = async error => {

      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

      error.networkError &&
        this.setState({ isVisibleNet: true, networkError: error.networkError.message})

  }
}


const styles = StyleSheet.create({
  container
})

export default PlaylistRecommendations
