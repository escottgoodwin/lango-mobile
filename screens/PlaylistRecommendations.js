import React from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { Text, Button } from 'native-base';
import { container } from '../css'

import { Query } from "react-apollo"
import  { PLAYLIST_QUERY } from '../ApolloQueries'

import ArtRecPlaylist from '../components/ArtRecPlaylist'
import Loading from './Loading'
import Error from './Error'

class PlaylistRecommendations extends React.Component {

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
          if (error) return <Error error={error} />

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
}

const styles = StyleSheet.create({
  container
})

export default PlaylistRecommendations
