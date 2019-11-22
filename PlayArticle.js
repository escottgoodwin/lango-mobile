import React,{Component} from "react"
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Button, Icon, Container } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Flag } from 'react-native-svg-flagkit'
import Tts from 'react-native-tts';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import { TRANSLATE_SENTENCE_MUTATION } from '../ApolloQueries'

const splitSentence = text => {
  return text.match( /[^\.!\?]+[\.!\?]+|[^\.!\?]+/g )
}

const voicify = lang => { 
  return lang + '-' + lang.toUpperCase()
}

class PlayArticle extends Component{

  state={
    token:'',
    playList:'',
    currSentIdx:0,
    currSent:'',
    playing:false,
    started:false,
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('auth_token')
  
    const { article, lang } = this.props
    this.setState({currSentIdx:0, token})
    const voiceLang = voicify(lang)
    
    const sents = splitSentence(article)

    const currSent = sents[0]

    this.setState({currSent})

    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage(voiceLang)
      this.play(currSent)
    })

    Tts.addEventListener('tts-start', (event) => this.setState({playing:true}));
    Tts.addEventListener('tts-finish', (event) => this.nextSent(sents));
    Tts.addEventListener('tts-cancel', (event) => this.setState({playing:false}));
  }

  nextSent = sents => {
    Tts.stop()
    const { currSentIdx } = this.state
    const newIdx = currSentIdx + 1

    if (newIdx === sents.length){
      this.setState({currSentIdx:0})
      this.props.nextArticle()

    } else {

    const currSent = sents[newIdx]

    this.setState({
      currSentIdx: newIdx,
      currSent
    })
    
    this.play(currSent)

    }
  }

  translate = async (lang, originalText, token) => {
    
    const result = await axios({
      url: 'https://us-central1-langolearn.cloudfunctions.net/api',
      method: 'post',
      headers: { 'Authorization': token },
      data: {
          query: TRANSLATE_SENTENCE_MUTATION,
          variables: { lang, originalText }
      }
    })

    const { orig_text, trans_text, orig_lang, trans_lang } = result.data.data.translateSentence

    const origVoice = voicify(orig_lang)
    const transVoice = voicify(trans_lang)

    Tts.stop()
    this.play(orig_text)

    Tts.stop()
    Tts.setDefaultLanguage(transVoice)
    this.play(trans_text)

    Tts.setDefaultLanguage(origVoice)

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
    Tts.pause()
    Tts.setDefaultRate(rate)
    this.setState({playing:false, started:false})
    Tts.resume()
  }

  finished = () => {
    Tts.stop()
    this.setState({playing:false})
  }

  componentWillUnmount(){
    Tts.stop()
    Tts.removeEventListener('tts-start');
    Tts.removeEventListener('tts-finish');
    Tts.removeEventListener('tts-cancel');
  }

  render(){

    const { currSent, token, started, playing } = this.state

    const { art_id, article, title, lang, navigation } = this.props
    console.log(this.props)
    return(
      <Container style={{backgroundColor:'#F4F3EF'}} >
          <Grid>
          <Row style={{height:70}}>
            <Col >
            <TouchableOpacity onPress={() => navigation.navigate('Article',{ art_id, lang })}>
              <Text style={{fontSize:18,margin:10,color:'#3A7891'}}>{title}</Text>
             </TouchableOpacity>
          </Col>
            
          </Row>

          <Row >
            <Col >
         
              <Text style={{fontSize:24, marginLeft:10, marginRight:10}}>{currSent}</Text>
           
             
          </Col>
            
          </Row>
        

            <Row style={{height:60}}>

              <Col>
                <Button style={{margin:10}} bordered warning onPress={() => this.changeSpeed(0.50)} title="1X" >
                  <Text warning>1X</Text>
                </Button>
                </Col>
                
                <Col>
                <Button style={{margin:10}} bordered warning onPress={() => this.changeSpeed(0.375)} title="1X" >
                  <Text  warning>0.75X</Text>
                </Button>
                </Col>

                <Col>
                <Button style={{margin:10}}  bordered warning onPress={() => this.changeSpeed(0.33)} title="1X" >
                  <Text  warning>0.66X</Text>
                </Button>
                </Col>

                <Col>
                <Button style={{margin:10}} bordered warning onPress={() => this.changeSpeed(0.25)} title="1X" >
                  <Text warning>0.5X</Text>
                </Button>
                </Col>
             
                </Row>

          <Row style={{height:50}}>
          <Col>
    
            {started ? 

            <Button style={{marginLeft:10, backgroundColor: playing ? '#dc3545' : '#28a745'}}  onPress={() => playing ? this.pause() : this.resume()} title="Pause" >
              {playing ?  <Icon  type="FontAwesome" name="pause" /> :  <Icon type="FontAwesome" name="play" />}
            </Button>
              :
            <Button style={{marginLeft:10, backgroundColor:'#28a745'}}  onPress={() => this.play(article)} title="Play" >
              <Icon  type="FontAwesome" name="play" />
            </Button>
            }

            </Col>

            <Col >
              <Button style={{backgroundColor:'#3A7891',marginLeft:10, marginRight:10}} onPress={() => this.translate(lang, currSent, token)}  >
                <Text>Translate</Text>
              </Button>
            </Col>

            <Col >
              <Button style={{backgroundColor:'#3A7891', marginRight:10}} onPress={() => this.props.nextArticle()}  >
                <Text>Skip</Text>
              </Button>
            </Col>
            
            
            </Row>


          </Grid>
          </Container>
    )
  }

}

export default PlayArticle
