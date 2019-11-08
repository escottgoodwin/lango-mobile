import React from 'react'

import { SelectableText } from "react-native-selectable-text";

const ArticleSelect = ({article}) => 

<SelectableText
  menuItems={["Translate"]}
  /* 
    Called when the user taps in a item of the selection menu:
    - eventType: (string) is the label
    - content: (string) the selected text portion
    - selectionStart: (int) is the start position of the selected text
    - selectionEnd: (int) is the end position of the selected text
   */
  onSelection={({ eventType, content, selectionStart, selectionEnd }) => { console.log('translated' + content)}}
  value={article}
  />

export default ArticleSelect
