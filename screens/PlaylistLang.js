import React from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { Text, Button } from 'native-base';
import { container } from '../css'
import { langSwitch } from '../utils'

import { Query } from "react-apollo"
import  { PLAYLIST_LANG_QUERY } from '../ApolloQueries'

import ArtRecPlaylistLang from '../components/ArtRecPlaylistLang'
import Loading from './Loading'
import Error from './Error'

class PlaylistLang extends React.Component {

  static navigationOptions = {
    title: 'Playlist'
  }

 render() {
  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const { language, flag_lang } = langSwitch(lang)
  return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      <ScrollView>

      <Query query={PLAYLIST_LANG_QUERY}
            fetchPolicy={'cache-and-network'}
            variables={{ lang }}
          >
          {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return <Error error={error} />

          const { playListLang } = data

          return (
              <>
              <View>
                <Text style={{fontSize:22}}>
                 {language} Playlist - {playListLang.length} Articles
                </Text>
              </View>

              <View style={{padding:15}}>
                <Button block success onPress={() => navigation.navigate('PlayListPlay',{ playList: playListLang })}  >
                  <Text>Play</Text>
                </Button>
              </View>

              <FlatList
                data={playListLang}
                renderItem={
                  ({ item }) => (
                    <ArtRecPlaylistLang {...item} props={this.props}/>
                  )
                }
                keyExtractor={item => item.art_id}
                />
                </>
              )
            }}
         </Query>

      </ScrollView>

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

export default PlaylistLang
