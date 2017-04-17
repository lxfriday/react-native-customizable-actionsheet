# react-native-customizable-actionsheet

## Demos 

|default|notitle|customize title or item|customize items|
|-------|-------|----------|---------------|
|<img src="https://github.com/lxfriday/react-native-customizable-actionsheet/blob/master/img/default.png?raw=true" width=250 />|<img src="https://github.com/lxfriday/react-native-customizable-actionsheet/blob/master/img/notitle.png?raw=true" width=250 />|<img src="https://github.com/lxfriday/react-native-customizable-actionsheet/blob/master/img/customize_title_item.png?raw=true" width=250 />|<img src="https://github.com/lxfriday/react-native-customizable-actionsheet/blob/master/img/customize_items.png?raw=true" width=250 />|

<img src="https://github.com/lxfriday/react-native-customizable-actionsheet/blob/master/img/actionsheet.gif?raw=true" width=250 />

## Code
```js
// notitle
<ActionSheet
  ref={ref => this.actionsheet = ref}
  funcs={actionSheetFuncs}
  actions={actionSheetActions}
/>

// customize the title 
<ActionSheet
  title={<IconElement name='call' size={15} color='red'/>}
  ref={ref => this.actionsheet = ref}
  funcs={actionSheetFuncs}
  actions={actionSheetActions}
/>

// OR

<ActionSheet
  title={'电话'}
  ref={ref => this.actionsheet = ref}
  funcs={actionSheetFuncs}
  actions={actionSheetActions}
/>

// customize items
import {Icon as IconElement} from 'react-native-elements';
import Communications from 'react-native-communications';
<ActionSheet
  title={'电话'}
  ref={ref => this.actionsheet = ref}
  buttonComponents={<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><IconElement name='call' size={50} color='red' raised reverse/></View>}
/>

// actionSheetFuncs: [() => Communications.phonecall(phone, true), () =>  Communications.text(phone), () => {Clipboard.setString(phone);this.actionsheet.hide();} ],
// actionSheetActions: [<View style={{flexDirection: 'row'}}><IconElement name='call' color='blue' size={15}/><Text>{phone}</Text></View>, '发短信给' + phone, '复制号码' ],

```

## API
|Property|Type|Default|Description|
|:-------|:---|:------|:----------|
|`funcs`|array of `function`|`[]`|function|
|`actions`|arrayof (`React.Component` or `string`)|`[]`|item title name|
|`title`|`React.Component` or `string`|`''`|top title|
|`buttonShows`|`number`|`6`|number of items to show|
|`buttonHeight`|`number`|`50`|item height|
|`buttonComponents`|`React.Component`|`null`|customize it youself **when set, actions and funcs will be useless**|
|`buttonComponentsHeight`|`number`|`150`|buttonComponentsHeight use with buttonComponents|
|`animationType`|[Easing](http://facebook.github.io/react-native/docs/easing.html)|`Easing.elastic(1)`|Animated.timing(v,{easing: `animationType`})|



## You Can Enjoy Customization

## [License](https://github.com/lxfriday/react-native-customizable-actionsheet/blob/master/LICENSE)


