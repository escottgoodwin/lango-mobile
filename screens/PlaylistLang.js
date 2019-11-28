import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { Text, Button } from 'native-base';
import { langSwitch } from '../utils'

import { Query } from "react-apollo"
import  { PLAYLIST_LANG_QUERY } from '../ApolloQueries'

import ArtRecPlaylistLang from '../components/ArtRecPlaylistLang'
import Loading from './Loading'
import Error from './Error'

const PlaylistLang = ({navigation}) =>  {

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

              {
                playListLang.length>0 ?
                  <View style={{padding:15}}>
                    <Button block success onPress={() => navigation.navigate('PlayListPlay',{ playList: playListLang })}  >
                      <Text>Play</Text>
                    </Button>
                  </View>
                  :
                  <View style={{padding:15}}>
                    <Text>Add Articles to Your Playlist</Text>
                  </View>

              }

              <FlatList
                data={playListLang}
                renderItem={
                  ({ item }) => (
                    <ArtRecPlaylistLang {...item} navigation={navigation}/>
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

PlaylistLang.navigationOptions = {
  title: 'Playlist'
}

export default PlaylistLang
