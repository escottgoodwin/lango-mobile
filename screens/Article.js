import React from 'react'
import { StyleSheet, Image, View, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Query, } from "react-apollo"
import moment from 'moment'
import Tts from 'react-native-tts';
import { Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'

import  { ARTICLE_QUERY } from '../ApolloQueries'

class Article extends React.Component {

    state = {
      user: '',
      lang:'',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
      playing:false,
      started:false
    }

  static navigationOptions = {
    title: 'Article',
    headerLeft: null
  }

  componentDidMount = async () => {
    const user1 = await AsyncStorage.getItem('user')
    const user = JSON.parse(user1)
    this.setState({user})
    const lang = this.props.navigation.getParam('lang', 'NO-ID')
    const voiceLang = lang + '-' + lang.toUpperCase()
  
    Tts.getInitStatus().then(() => {
      this.setState({playable:true})
      Tts.setDefaultLanguage(voiceLang)
    })

    Tts.addEventListener('tts-start', (event) => this.setState({playing:true}));
    Tts.addEventListener('tts-finish', (event) => this.setState({playing:false}));
    Tts.addEventListener('tts-cancel', (event) => this.setState({playing:false}));
    
  }

  play = article => {
    Tts.speak(article)
    this.setState({started:true})
  }

  pause = () => {
    Tts.pause()
    this.setState({playing:false})
  }

  resume = () => {
    Tts.resume()
    this.setState({playing:true})
  }

  changeSpeed = rate => {
    Tts.stop()
    Tts.setDefaultRate(rate)
    this.setState({playing:false, started:false})
  }

  stop = rate => {
    Tts.stop()
  }

  finished = () => {
    Tts.stop()
    this.setState({playing:false})
  }

  componentWillUnmount(){
    Tts.stop()
    Tts.removeEventListener('tts-start', (event) => this.setState({playing:true}));
    Tts.removeEventListener('tts-finish', (event) => this.finished());
    Tts.removeEventListener('tts-cancel', (event) => this.setState({playing:false}));
  }


 render() {

  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const art_id = navigation.getParam('art_id', 'NO-ID')
  const { playable, playing, started } = this.state

    return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      

        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <View><Text>Loading...</Text></View>
                if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

                const { article, title, link, date, translations } = data.article
              
            return (
              <>
              <ScrollView>
              <View>
                <Text>
                  {moment(date).format('MMMM Do YYYY')}
                </Text>
              </View>

              <View>
                <Text style={{fontSize:24,marginBottom:3,color:'#3A7891'}}>
                  {title}
                </Text>
              </View>
              
              
                <Text style={{fontSize:22}}>
                  {article}
                </Text>
              </ScrollView>

              <Grid>
        
              <Row>
                <Col>
              {started ? 
    
              <Button style={{backgroundColor: playing ? 'red' : 'green'}}  onPress={() => playing ? this.pause() : this.resume()} title="Pause" >
                  {playing ?  <Icon  name="pause" /> :  <Icon  name="play" />}
                </Button>
                :
              <Button style={{backgroundColor:'green'}}  onPress={() => this.play(article)} title="Play" >
                <Icon name="play" />
              </Button>
              }
               
              </Col>

              <Col>
                <Button bordered onPress={() => this.changeSpeed(0.50)} title="1X" >
                  <Text style={{color:'blue'}}>1X</Text>
                </Button>
                </Col>
                
                <Col>
                <Button bordered  onPress={() => this.changeSpeed(0.375)} title="1X" >
                  <Text style={{color:'blue'}}>3/4X</Text>
                </Button>
                </Col>

                <Col>
                <Button bordered  onPress={() => this.changeSpeed(0.33)} title="1X" >
                  <Text style={{color:'blue'}}>2/3X</Text>
                </Button>
                </Col>

                <Col>
                <Button bordered onPress={() => this.changeSpeed(0.25)} title="1X" >
                  <Text style={{color:'blue'}}>1/2X</Text>
                </Button>
                </Col>
                </Row>
              
              </Grid>
   
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

}

export default Article
