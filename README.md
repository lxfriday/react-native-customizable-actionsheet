# react-native-customizable-actionsheet

## demo

|default|with titlw|customize title|customize items|
|-------|----------|---------------|---------------|
|||||

### 有title

```javascript
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
<ActionSheet
  title={'电话'}
  ref={ref => this.actionsheet = ref}
  buttonComponents={<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><IconElement name='call' size={50} color='red' raised reverse/></View>}
/>

```

### API
|Property|Type|Default|Description|
|--------|----|-------|-----------|
|funcs|array of function|[]|function|
|actions|arrayof (React.Component or string)|[]|item title|
|title|React.Component or string|''|top title|
|buttonShows|number|6|number of items to show|
|buttonHeight|number|50|item height|
|buttonComponents|React.Component|null|customize it youself|


