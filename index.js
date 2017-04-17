/**
 * a  customizable RN ActionSheet
 */
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  PixelRatio,
  ScrollView,
  Dimensions,
  Modal,
  Easing
} from 'react-native';
const MIN_WIDTH = 1/PixelRatio.get();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class ReactNativeCustomizableActionSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetAnim: new Animated.Value(0),//translateY是Y轴的偏移量，向Y轴的负方向的偏移量
      shown: false, //是否处于显示状态
    };
  }
  
  // hide
  hide = () => {
    const {animationType} = this.props;
    Animated.timing(this.state.sheetAnim, {
      toValue: this.translateY,
      duration: 300,
      easing: animationType
    }).start(this._toggleShown);//这个函数必须放到start里面，否则没有动画效果
  }
  
  // show
  show = () => {
    this._toggleShown();
    this._showSheet();
  }

  _showSheet = () => {
    const {animationType} = this.props;
    Animated.timing(this.state.sheetAnim, {
      toValue: 0,
      duration: 300,
      easing: animationType
    }).start();
  }

  // // toggle
  _toggle = () => {
    if(this.state.shown) {
			this.hide();
		}
		else {
			this.show();
			// this._toggleShown();
		}
  }
  
  _toggleShown = () => {
    this.setState({
      shown: !this.state.shown
    });
  }
  
  // 渲染button
  _renderButton = () => {
    const {funcs,actions,buttonHeight} = this.props;
    return actions.map((val, i) => {
      return (
        <TouchableNativeFeedback
          onPress={funcs[i]}
          key={i}
          background={TouchableNativeFeedback.Ripple('#108eeb', false)}
        >
          <View style={{height: buttonHeight, justifyContent: 'center', alignItems: 'center', borderBottomWidth: MIN_WIDTH, borderColor: '#ccc', backgroundColor: '#fff'}}>
            {typeof val === 'string'?
              <Text style={{color: '#000', fontSize: 16}}>{val}</Text>
            :
              val
            }
          </View>
        </TouchableNativeFeedback>
      );
    });
  }
  
  // 渲染标题
  _renderTitle = () => {
    const {title} = this.props;
    return title.length === 0 ?null:(
      <View style={{justifyContent: 'center', alignItems: 'center', height: 34, borderBottomWidth: MIN_WIDTH, borderColor: '#ccc', backgroundColor: '#fff'}}>
        {typeof title === 'string'?
          <Text style={{fontSize: 13, color: '#777'}}>{title}</Text>
        :
          title
        }
      </View>
    );
  }
  
  render() {
    const {
      sheetAnim,
      shown
    } = this.state;
    const {
      buttonComponentsHeight,
      buttonComponents,
      buttonHeight,
      buttonShows,
      actions,
      title
    } = this.props;
    const titleHeight = title.length === 0? 0: 34;//only '' will be 0, React.Component OR string will be 34
    let buttonsItemHeight = 0;
    if(!buttonComponents) {
      buttonsItemHeight = buttonHeight * (actions.length >= buttonShows? buttonShows:actions.length);
    }
    else {
      buttonsItemHeight = buttonComponentsHeight;
    }
    this.translateY = buttonsItemHeight + titleHeight;
    return (
      <Modal
        animationType='fade'
        visible={shown}
        transparent={true}
        onRequestClose={this._toggle}
      >
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,.2)'}}>
          {/* 遮挡的overlay */}
          <Text onPress={this._toggle} style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}/>
          <Animated.View
            style={{height: this.translateY, flex: 1, alignSelf: 'flex-end', borderTopWidth: MIN_WIDTH, borderColor: '#ccc', transform: [{translateY: sheetAnim}] }}
          >
            {this._renderTitle()}
            {buttonComponents?
              buttonComponents
              :
              <ScrollView contentContainerStyle={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
                {this._renderButton()}
              </ScrollView>
            }
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

ReactNativeCustomizableActionSheet.defaultProps = {
  funcs: [],//对应的条目的函数
  actions: [],//操作名
  title: '',//ActionSheet的标题名
  buttonShows: 6,//展示的button的个数
  buttonHeight: 50,//单个item的高度
  buttonComponents: null,//自己定制
  buttonComponentsHeight: 150,//自己定制的时候的actionsheet高度
  animationType: Easing.elastic(1),//动画类型
};
ReactNativeCustomizableActionSheet.propTypes = {
  funcs: PropTypes.arrayOf(PropTypes.func),
  actions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  buttonShows: PropTypes.number,
  buttonHeight: PropTypes.number,
  buttonComponents: PropTypes.element,
  buttonComponentsHeight: PropTypes.number,
  animationType: PropTypes.any,
};

