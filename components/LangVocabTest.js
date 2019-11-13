import React,{Component} from "react"
import Icon from 'react-native-vector-icons/AntDesign'
import { View, ScrollView } from 'react-native'
import { Text, Button, Input, Toast, Container, Item } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Flag } from 'react-native-svg-flagkit'
import AsyncStorage from '@react-native-community/async-storage';
import { langSwitch } from '../utils'
import ArtAnswer from './ArtAnswer'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class LangVocabTest extends Component{

  state={
    guess:'',
    feedback:false,
    newQuestion:'',
    newAnswer:'', 
    curQuestion:'',
    curAnswer:'',
    correct:false,
    vocab:[],
    language:'',
    native_lang:'',
    native_flag:'',
    trans_flag:'',
    art_id:'',
    answer_id:'',
    trans_lang:'',
    article_lang:'',
    showToast: false,
    answereds:[]
  }

  componentDidMount = async () => {
    const { vocab, navigation } = this.props
    const lang = navigation.getParam('lang', 'NO-ID')
    const langVocab = vocab.filter(v => v.orig_lang===lang)
    this.setState({vocab:langVocab})
    const rnd = getRandomInt(langVocab.length)
    const newQuestion = langVocab[rnd]
    this.setState({newQuestion:newQuestion.orig_text, newAnswer:newQuestion.trans_text, trans_lang: newQuestion.orig_lang,art_id:newQuestion.art_id})
    const user1 = await AsyncStorage.getItem('user')
    const { native_lang } = JSON.parse(user1)
    const nativeLang = langSwitch(native_lang)
    const orig_lang = langSwitch(newQuestion['orig_lang'])
    const native_flag = nativeLang.flag_lang.toUpperCase()
    const trans_flag = orig_lang.flag_lang.toUpperCase()

    this.setState({language: nativeLang.language, native_flag, native_lang, trans_flag, article_lang: newQuestion.orig_text})
  
  }

  resetVocab = (answer) => {
    const { vocab } = this.state
    if (vocab.length>1){
      return vocab.filter(v => v.trans_text!==answer)
    } else { 
      return this.props.vocab
    }
  }

  checkVocab = (question, answer, guess, art_id, trans_lang, answereds) => {
    this.setState({feedback:true, curAnswer: answer, curQuestion: question})

    if (answer.toLowerCase()===guess.toLowerCase()){
      const answered = {ansCorrect:true, answered:question, art_id: art_id, art_lang: trans_lang}

      answereds.unshift(answered)
      
      this.setState({answereds})

      const response = `Your answer was correct! ${guess} means ${answer}`
      Toast.show({
        text: response,
        buttonText: 'Okay',
        duration: 3000,
        type: "success"
      })

    } else {

      const answered = {ansCorrect:false, answered:question, art_id: art_id, art_lang: trans_lang} 
      answereds.unshift(answered)

      this.setState({answereds})
      
      const response = `Your answer was incorrect! ${question} means ${answer}`
      Toast.show({
        text: response,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
      })

    }

    const newVocab = this.resetVocab(answer)
    
    this.setState({vocab: newVocab})
    const rnd = getRandomInt(newVocab.length)
    const newQuestion = newVocab[rnd]

    const { flag_lang } = langSwitch(newQuestion['orig_lang'])

    this.setState({
        newQuestion: newQuestion['orig_text'], 
        newAnswer: newQuestion['trans_text'], 
        trans_lang: newQuestion['orig_lang'], 
        trans_flag: flag_lang.toUpperCase(),
        art_id: newQuestion['art_id'], 
        article_id: art_id,
        article_lang: trans_lang,
        guess:''
      })
  } 

  render(){

    const { 
      guess,
      newQuestion,
      newAnswer, 
      language,
      art_id,
      trans_flag,
      native_flag,
      trans_lang,
      answereds
      } = this.state

      const lang = ''

      const { navigation } = this.props

    return(

      <View style={{marginTop:20}}>
        
        <Text>What does {newQuestion} mean in {language}?</Text>
          <View style={{
            marginTop:10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
            }}>
          <Row>
            <Col >
              <Flag id={trans_flag}  size={0.3}/> 
            </Col>
            <Col >
              <Icon name="arrowright" size={48} color="#3A7891" />
            </Col>
            <Col >
              <Flag id={native_flag}  size={0.3}/> 
            </Col>
          </Row>
          </View>
         
          <Item  style={{marginTop:10}} regular>
          <Input style={{backgroundColor:'white'}}
            placeholder='Answer...'
            onChangeText={(text) => this.setState({ guess: text })}
            value={guess}
            autoCapitalize='none'
          />
          </Item>

      
            <Button style={{backgroundColor:'#3A7891', marginTop:10}} onPress={() => this.checkVocab(newQuestion, newAnswer, guess, art_id, trans_lang, answereds)}  >
              <Text>Submit</Text>
            </Button>

            <View
            style={{
              borderBottomColor: '#3A7891',
              borderBottomWidth: 1,
              marginTop:10,
              width:'100%'
            }}
          />
          
          <View style={{marginTop:20}}>

          <Text style={{fontSize:16, textAlign: 'center', color:'#3A7891'}}>Answers</Text>
          <ScrollView>
          {
            answereds.map((a,i) =>
              <ArtAnswer key={i} {...a} navigation={navigation} />
            )
          }
          </ScrollView>
          </View>

          </View>
    )
  }

}

export default LangVocabTest
