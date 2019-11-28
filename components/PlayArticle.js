import React,{Component} from "react"
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { Text, Button, Icon, Container } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Flag } from 'react-native-svg-flagkit'
import Tts from 'react-native-tts';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { voicify, splitSentence } from '../utils'

import { TRANSLATE_SENTENCE_MUTATION, REMOVE_PLAYLIST_MUTATION } from '../ApolloQueries'

class PlayArticle extends Component{

  state={
    token:'',
    playList:'',
    currSentIdx:0,
    currSent:'',
    playing:false,
    started:false,
    speed1:true,
    speed66:false,
    speed75:false,
    speed50:false,
    orig_text:'',
    orig_lang:'',
    trans_text:'',
    trans_lang:'',
    transPlaying:false,
    modalVisible:false
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('auth_token')
  
    const { article, lang, art_id } = this.props
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
    Tts.addEventListener('tts-finish', (event) => this.finishSpeaking(sents));
    Tts.addEventListener('tts-cancel', (event) => this.setState({playing:false}));
  }

  removeFromPlaylist = async () => {
    const { token } = this.state
    const { art_id } = this.props
    await axios({
      url: 'https://us-central1-langolearn.cloudfunctions.net/api',
      method: 'post',
      headers: { 'Authorization': token },
      data: {
          query: REMOVE_PLAYLIST_MUTATION,
          variables: { art_id }
      }
    })
  }

  finishSpeaking = sents => { 
    const { transPlaying, orig_text, orig_lang } = this.state
    if (transPlaying){
      
      this.playTrans(orig_text,orig_lang)
      this.setState({modalVisible:false, transPlaying:false})

    } else {
      this.nextSent(sents)
    }
  }

  nextSent = sents => {
    Tts.stop()
    const { currSentIdx } = this.state
    const newIdx = currSentIdx + 1

    if (newIdx === sents.length){
      this.setState({currSentIdx:0})
      this.removeFromPlaylist()
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

    const transVoice = voicify(trans_lang)

    this.setState({modalVisible: true, transPlaying: true, orig_text, orig_lang, trans_text, trans_lang})

    this.playTrans(trans_text, trans_lang)

  }

  play = article => {
    Tts.speak(article)
    this.setState({started:true})
  }

  playTrans = (text,lang) => {
    Tts.stop()
    const voice = voicify(lang)
    Tts.setDefaultLanguage(voice)
    Tts.speak(text)
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
    if (rate===0.50){
      this.setState({
        speed1:true,
        speed50:false,
        speed66:false,
        speed75:false
      })
    }
    if (rate===0.375){
      this.setState({
        speed1:false,
        speed50:false,
        speed66:false,
        speed75:true
      })
    }
    if (rate===0.33){
      this.setState({
        speed1:false,
        speed50:false,
        speed66:true,
        speed75:false
      })
    }

    if (rate===0.25){
      this.setState({
        speed1:false,
        speed50:true,
        speed66:false,
        speed75:false
      })
    }
    Tts.pause()
    Tts.setDefaultRate(rate)
    this.setState({playing:false, started:false})
    Tts.resume()
  }

  finished = () => {
    Tts.stop()
    this.setState({playing:false})
  }

  stopTranslation = () =>{
    this.sets({modalVisible:false})
    Tts.resume()
  }

  componentWillUnmount(){
    Tts.stop()
    Tts.removeEventListener('tts-start');
    Tts.removeEventListener('tts-finish');
    Tts.removeEventListener('tts-cancel');
  }

  render(){

    const { currSent, token, started, playing, speed1, speed50, speed66, speed75, orig_text, trans_text, modalVisible } = this.state

    const { art_id, article, title, lang, navigation } = this.props

    return(
      <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Container style={{backgroundColor:'#F4F3EF'}}>
        <ScrollView>
          <View style={{marginTop:50}}>
          <Text style={{display: 'flex', fontSize:24, margin: 20}}>Translation</Text>
            
            <View style={{margin: 20}}>
              <Text style={{fontSize:22,color:'green'}}>{orig_text}</Text> 
              <Text style={{fontSize:22,color:'blue'}}>{trans_text}</Text>
            </View>
          </View>
          </ScrollView>
          <View style={{height:60}}>
          <Button style={{marginLeft:20, marginRight:20}} onPress={() => this.setState({modalVisible:false})}>
            <Text>Close</Text>
          </Button>
        </View>
        
        </Container>
      </Modal>
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
                <Button style={{margin:10}} bordered={!speed1} warning onPress={() => this.changeSpeed(0.50)} title="1X" >
                  <Text warning>1X</Text>
                </Button>
                </Col>
                
                <Col>
                <Button style={{margin:10}} bordered={!speed75} warning onPress={() => this.changeSpeed(0.375)} title="1X" >
                  <Text  warning>0.75X</Text>
                </Button>
                </Col>

                <Col>
                <Button style={{margin:10}}  bordered={!speed66} warning onPress={() => this.changeSpeed(0.33)} title="1X" >
                  <Text  warning>0.66X</Text>
                </Button>
                </Col>

                <Col>
                <Button style={{margin:10}} bordered={!speed50} warning onPress={() => this.changeSpeed(0.25)} title="1X" >
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
                 <Icon  type="FontAwesome" style={{color:'white'}} name="forward" />
              </Button>
            </Col>
            
            
            </Row>


          </Grid>
          </Container>
          </>
    )
  }

}

export default PlayArticle
