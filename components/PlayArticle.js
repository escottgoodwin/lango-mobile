import React,{Component} from "react"
import { View, ScrollView } from 'react-native'
import { Text, Button, Input, Toast, Container, Item } from 'native-base';
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
  
    const { article, lang, navigation } = this.props
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
    Tts.stop()
    Tts.setDefaultRate(rate)
    this.setState({playing:false, started:false})
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

    const { currSent, token } = this.state

    const { article, title, lang, navigation } = this.props

    return(
        
          <Grid>
          <Row>
            <Col >
            <Text style={{fontSize:18,marginTop:20}}>{title}</Text>
          </Col>
            
          </Row>

          <Row>
            <Col >
              <Text style={{fontSize:24,marginTop:20, marginBottom:10}}>{currSent}</Text>
          </Col>
            
          </Row>

          <Row>
            <Col >
              <Button success style={{margin:10}} onPress={() => this.play(lang, currSent)}  >
                <Text>Play</Text>
              </Button>
            </Col>

            <Col >
              <Button success style={{margin:10}} onPress={() => this.pause()}  >
                <Text>Pause</Text>
              </Button>
            </Col>
            
            <Col >
              <Button success style={{margin:10}} onPress={() => this.resume()}  >
                <Text>Resume</Text>
              </Button>
            </Col>
          
          </Row>

          <Row>
            <Col >
              <Button style={{backgroundColor:'#3A7891', margin:10}} onPress={() => this.translate(lang, currSent, token)}  >
                <Text>Translate</Text>
              </Button>
            </Col>

            <Col >
              <Button style={{backgroundColor:'#3A7891', margin:10}} onPress={() => this.props.nextArticle()}  >
                <Text>Skip</Text>
              </Button>
            </Col>
            
          </Row>

          </Grid>
         
    )
  }

}

export default PlayArticle
