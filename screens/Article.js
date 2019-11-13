import React from 'react'
import { View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Tts from 'react-native-tts';
import { Button, Icon, Text, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Flag } from 'react-native-svg-flagkit'
import { langSwitch } from '../utils'

import { Query, Mutation } from "react-apollo"
import  { ARTICLE_QUERY, TRANSLATION_MUTATION } from '../ApolloQueries'

import Loading from './Loading'
import SelectableText from './SelectableText'

class Article extends React.Component {

    state = {
      user: null,
      lang:'',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:'',
      isVisibleNet:false,
      playing:false,
      started:false,
      modalVisible: false,
      orig_text:'', 
      trans_text:'',
      errorMsg:'',
      selText:''
    }

  static navigationOptions = {
    title: 'Article',
    headerLeft: null
  }

  componentDidMount = async () => {

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
  const { language, flag_lang } = langSwitch(lang)
  const flaglang = flag_lang.toUpperCase()
  const art_id = navigation.getParam('art_id', 'NO-ID')
  const { playing, started, modalVisible, orig_text, trans_text, errorMsg, selText } = this.state

    return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      
        <Query query={ARTICLE_QUERY} variables={{ artId: art_id, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <View><Text>{JSON.stringify(error)}</Text></View>

                const { article, title, date, translations } = data.article
              
            return (
              <>
              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <ScrollView>
                <View style={{flex:1, padding:20, backgroundColor:'#F4F3EF'}}>
                  <View style={{marginTop:50}}>
                  <Text style={{display: 'flex', fontSize:24, alignItems: 'center'}}>Translations</Text>
                    
                    {translations.map((t,i) => 
                    <View key={i} style={{margin: 20}}>
                      <Text style={{fontSize:22,color:'green'}}>{t.orig_text}</Text> 
                      <Text style={{fontSize:22,color:'blue'}}>{t.trans_text}</Text>
                    </View>
                      )}
                  </View>
                  <Button onPress={() => this.setState({modalVisible:false})}>
                    <Text>Close</Text>
                  </Button>
                </View>
                </ScrollView>
              </Modal>

              
              <View>
                <Text>
                  {moment(date).format('MMMM Do YYYY')}
                </Text>
              </View>

              <View>
                
                <Text style={{fontSize:24,marginBottom:10,color:'#3A7891'}}>
                  {title}
                </Text>
                  
              </View>

              <View style={{height:60}}>

                {
                  (selText.length===0 && orig_text.length===0) &&
                    <Grid>

                    <Row>
                      <Col size={20}>
                      <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
                        <Flag id={flaglang} size={0.3} /> 
                      </TouchableOpacity>
                      </Col>
                      <Col size={80}>
                        <Text style={{fontSize:18, color:'green'}}>Highlight a word to translate.</Text> 
                      </Col>
                    </Row>
                  </Grid>
                }

                {selText.length>0 &&
                <Grid>
                  <Row>
                    <Col size={20}>
                    <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
                      <Flag id={flaglang} size={0.3} /> 
                    </TouchableOpacity>
                    </Col>
                    <Col size={80}>
                    <Text style={{fontSize:18,color:'green'}}>{selText}</Text>
                    
                    <Mutation
                      mutation={TRANSLATION_MUTATION}
                      variables={{ 
                        originalText: selText,
                        artId: art_id,
                        lang
                      }}
                      onCompleted={data => this._confirm(data)}
                      onError={error => this._error (error)}
                      refetchQueries={() => { return [{
                        query: ARTICLE_QUERY,
                        variables: { artId: art_id, lang }}]
                      }}
                    >
                    {mutation => (
                      <View style={{width:100}}>
                        <Button small style={{backgroundColor:'blue'}} onPress={mutation}>
                          <Text>Translate</Text>
                        </Button>
                      </View>
                      )}
                    </Mutation>
                    
                    </Col>
                  </Row>
                </Grid>
                
                }

              {orig_text.length>0 && 
                <Grid>

                  <Row>
                    <Col size={20}>
                    <TouchableOpacity onPress={() => navigation.navigate('LangDashboard',{ lang, language })}>
                      <Flag id={flaglang} size={0.3} /> 
                    </TouchableOpacity>
                    </Col>

                    <Col size={80}>
                       <Text style={{fontSize:18, color:'green'}}>{orig_text}</Text> 
                       <Text style={{fontSize:18, color:'blue'}}>{trans_text}</Text>
                    </Col>

                  </Row>
                </Grid>

              }
                 
                {errorMsg.length>0 && <Text style={{fontSize:22, color:'red'}}>{errorMsg}</Text>} 
              
              </View>

              <ScrollView>

              <SelectableText
                selectable={true}
                menuItems={["Select"]}
                onSelection={({ eventType, content, selectionStart, selectionEnd }) => {
                  this.setState({selText:content,orig_text:'',trans_text:''})
                }}
                style={{fontSize:22}}
                value={article}
              />
             
                          
              </ScrollView>

              <Grid style={{margin:10}}>
        
              <Row>
              <Col>
              {started ? 
    
              <Button style={{backgroundColor: playing ? '#dc3545' : '#28a745'}}  onPress={() => playing ? this.pause() : this.resume()} title="Pause" >
                {playing ?  <Icon  type="FontAwesome" name="pause" /> :  <Icon  type="FontAwesome" name="play" />}
              </Button>
                :
              <Button style={{backgroundColor:'#28a745'}}  onPress={() => this.play(article)} title="Play" >
                <Icon type="FontAwesome" name="play" />
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
             

                <Col>
                <Button onPress={() => this.setState({modalVisible:true})} title="1X" >
                  <Icon type="FontAwesome" name="language" />
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

  _confirm = (data) => {
    console.log(data)
    const { orig_text, trans_text } = data.translation
     this.setState({orig_text, trans_text})
     this.setState({selText:''})
     this.setState({errorMsg:''})
    }

  _error = async error => {

      console.log(error)

  }

  

}

export default Article
