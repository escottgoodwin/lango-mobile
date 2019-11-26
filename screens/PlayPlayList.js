import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { container } from '../css'

import PlayListPlay from '../components/PlayListPlay'

class PlayPlayList extends React.Component {

  static navigationOptions = {
    title: 'Play Playlist',
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
