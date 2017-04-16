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
  Modal
} from 'react-native';
const MIN_WIDTH = 1/PixelRatio.get();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class ReactNativeActionSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetAnim: new Animated.Value(0),//translateY是Y轴的偏移量，向Y轴的负方向的偏移量
      shown: false, //是否处于显示状态
    };
  }
  
  // hide
  hide = () => {
    Animated.timing(this.state.sheetAnim, {
      toValue: this.translateY,
      duration: 300
    }).start(this._toggleShown);//这个函数必须放到start里面，否则没有动画效果
  }
  
  // show
  show = () => {
    this._toggleShown();
    this._showSheet();
  }

  _showSheet = () => {
    Animated.timing(this.state.sheetAnim, {
      toValue: 0,
      duration: 300
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
          <View style={{height: buttonHeight, justifyContent: 'center', alignItems: 'center', borderBottomWidth: MIN_WIDTH, borderColor: '#ccc', backgroundColor: '#eee'}}>
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
      <View style={{paddingTop: 8, paddingBottom: 8, alignItems: 'center', borderBottomWidth: MIN_WIDTH, borderColor: '#ccc',}}>
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
      buttonCompoents,
      buttonHeight,
      buttonShows,
      actions,
      title
    } = this.props;
    this.translateY = buttonHeight * (actions.length >= buttonShows? buttonShows:actions.length) + (title.length === 0?0:34);
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
            style={{height: this.translateY, flex: 1, alignSelf: 'flex-end', borderTopWidth: MIN_WIDTH, borderColor: '#ccc', backgroundColor: '#eee', transform: [{translateY: sheetAnim}] }}
          >
            {this._renderTitle()}
            <ScrollView showsVerticalScrollIndicator={false}>
            {buttonCompoents?
              buttonCompoents
              :
              this._renderButton()
            }
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

ReactNativeActionSheet.defaultProps = {
  funcs: [],//对应的条目的函数  -> required
  actions: [],//操作名 -> required
  title: '',//ActionSheet的标题名  -> optional
  buttonShows: 6,//展示的button的个数
  buttonHeight: 50,//单个item的高度
  buttonCompoents: null,//自己定制
};
ReactNativeActionSheet.propTypes = {
  funcs: PropTypes.arrayOf(PropTypes.func).isRequired,
  actions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])).isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  buttonShows: PropTypes.number,
  buttonHeight: PropTypes.number,
  buttonCompoents: PropTypes.node
};

