import React from 'react'
import { View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Tts from 'react-native-tts';
import { Button, Icon, Container, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Flag } from 'react-native-svg-flagkit'
import { langSwitch } from '../utils'

import { Query, Mutation } from "react-apollo"
import  { ARTICLE_QUERY, TRANSLATION_MUTATION } from '../ApolloQueries'

import Loading from './Loading'
import Error from './Error'
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
    Tts.removeEventListener('tts-start', (event) => this.setState({playing:true}));
    Tts.removeEventListener('tts-finish', (event) => this.finished());
    Tts.removeEventListener('tts-cancel', (event) => this.setState({playing:false}));
  }

 render() {
  const art_id1 = ''
  const { navigation } = this.props
  const lang = navigation.getParam('lang', 'NO-ID')
  const { language, flag_lang } = langSwitch(lang)
  const flaglang = flag_lang.toUpperCase()
  const art_id = navigation.getParam('art_id', 'NO-ID')
  const { modalVisible, orig_text, trans_text, errorMsg, selText } = this.state

    return (
      <View style={{flex:1,backgroundColor:'#F4F3EF',padding:'5%'}}>
      
        <Query query={ARTICLE_QUERY} variables={{ artId: art_id1, lang }} >
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

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
                <Container style={{backgroundColor:'#F4F3EF'}}>
                <ScrollView>
                  <View style={{marginTop:50}}>
                  <Text style={{display: 'flex', fontSize:24, margin: 20}}>Translations</Text>
                    
                    {translations.map((t,i) => 
                    <View key={i} style={{margin: 20}}>
                      <Text style={{fontSize:22,color:'green'}}>{t.orig_text}</Text> 
                      <Text style={{fontSize:22,color:'blue'}}>{t.trans_text}</Text>
                    </View>
                      )}
                  </View>
                  </ScrollView>
                  <View style={{height:60}}>
                  <Button style={{marginLeft:20,marginRight:20}} onPress={() => this.setState({modalVisible:false})}>
                    <Text>Close</Text>
                  </Button>
                </View>
                
                </Container>
              </Modal>

              <Container style={{backgroundColor:'#F4F3EF'}}>
              <View>
                <Text>
                  {moment(date).format('MMMM Do YYYY')}
                </Text>
              </View>

              <View>
                
                <Text style={{fontSize:16,marginBottom:10,color:'#3A7891'}}>
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
                        <Flag id={flaglang} size={0.2} /> 
                      </TouchableOpacity>
                      </Col>
                      <Col size={80}>
                        <Text style={{fontSize:14, color:'green'}}>Select word to translate.</Text> 
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
                    <Text style={{fontSize:14,color:'green'}}>{selText}</Text>
                    
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
                       <Text style={{fontSize:14, color:'green'}}>{orig_text}</Text> 
                       <Text style={{fontSize:14, color:'blue'}}>{trans_text}</Text>
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
              
              <Button style={{backgroundColor:'#28a745',marginRight:10}}  onPress={() =>  navigation.navigate('PlayListPlay1',{ art_id, lang })} >
                <Icon type="FontAwesome" name="play" /><Text>Play</Text>
              </Button>
               
              </Col>

                <Col>
                <Button onPress={() => this.setState({modalVisible:true})}  >
                  <Icon type="FontAwesome" name="language" /><Text style={{fontSize:14}}>Translations</Text>
                </Button>
                </Col>
                </Row>
              
              </Grid>
              </Container>
              </>
              )
            }}
         </Query>
  
      
      </View>
    )

  }

  _confirm = data => {
    const { orig_text, trans_text } = data.translation
     this.setState({orig_text, trans_text})
     this.setState({selText:''})
     this.setState({errorMsg:''})
    }

  _error = error => {
      const jsonError = JSON.stringify(error)
      Toast.show({
        text: jsonError,
        buttonText: 'Okay',
        duration: 3000,
        type: "danger"
      })
  }

  

}

export default Article
