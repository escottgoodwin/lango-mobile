import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { container } from '../css'
import { Col, Row } from 'react-native-easy-grid'

import { Query } from "react-apollo"
import { PLAYLIST_QUERY } from '../ApolloQueries'

import PlayListPlay from '../components/PlayListPlay'
import Loading from './Loading'

class PlayPlayList extends React.Component {

  static navigationOptions = {
    title: 'Play Playlist',
    headerLeft: null
  }
  state = {
    currArtIndex:0,
    currArt:''
  }

  componentDidMount(){
    const { navigation } = this.props
    const playList = navigation.getParam('playList', 'NO-ID')

    this.setState({
      currArtIndex:0,
      currArt: playList[0]
    })
  }

  nextArticle = () => {
    const { navigation } = this.props
    const playList = navigation.getParam('playList', 'NO-ID')
    
    const { currArtIndex } = this.state
    const newIdx = currArtIndex + 1
    const currArt = playList[newIdx]

    this.setState({
      currArt, 
      currArtIndex: newIdx
    })
  }

  render(){
    const { currArt } = this.state
  return (
      
      <ScrollView style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
   
        <PlayListPlay nextArticle={this.nextArticle} {...currArt} />           
              
      </ScrollView>

    )
  }

  }

const styles = StyleSheet.create({
  container
})

export default PlayPlayList
