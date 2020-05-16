/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
  Modal,
  Alert,
  StyleSheet,
  Image as Img,
} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Image from 'react-native-auto-scale-image';
import {BlurView} from 'expo-blur';

const images = [
  'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
  'https://analyticsindiamag.com/wp-content/uploads/2019/11/Image-Processing-Libraries.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
  'https://wallpapercave.com/wp/wp2608078.jpg',
  'https://wallpaperaccess.com/full/138728.jpg',
  'https://images.unsplash.com/photo-1465572089651-8fde36c892dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
  'https://i.pinimg.com/originals/f0/60/d4/f060d45d3047e8e307fcf41d97186fdf.jpg',
];
class App extends Component {
  constructor(props) {
    super(props);
    this.likeRef = React.createRef();

    this.state = {
      selected: false,
      selecteduri:
        'https://yourstrulyindia.com/wp-content/uploads/2019/06/placeholder.jpg',
      likeX: null,
      likeXwidth: null,
      likeY: null,
      likeYheight: null,

      CommentX: null,
      CommentXwidth: null,
      CommentY: null,
      CommentYheight: null,

      moreX: null,
      moreXwidth: null,
      moreY: null,
      moreYheight: null,
    };
  }

  handleMeasure = (key, ref) => () => {
    ref.current.measure((x, y, width, height, pageX, pageY) => {
      if (key.toString() == 'like') {
        this.setState({
          likeX: pageX,
          likeXwidth: width,
          likeY: pageY,
          likeYheight: height,
        });
      } else if (key.toString() == 'comment') {
        this.setState({
          CommentX: pageX,
          CommentXwidth: width,
          CommentY: pageY,
          CommentYheight: height,
        });
      } else if (key.toString() == 'more') {
        this.setState({
          moreX: pageX,
          moreXwidth: width,
          moreY: pageY,
          moreYheight: height,
        });
      }
      console.log(y);
    });
  };

  picScale = new Animated.Value(0);

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      var uri = e._targetInst.memoizedProps.source.uri;
      this.long_press_timeout = setTimeout(() => {
        this.setState({
          selected: true,
          selecteduri: uri,
        });
        console.log('longPressed');
        Animated.spring(this.picScale, {
          toValue: 1,
          useNativeDriver: true,
          delay: 10,
        }).start();
      }, 100);
    },
    onPanResponderMove: (e, gestureState) => {
      // console.log(gestureState);
      if (
        gestureState.moveX > this.state.likeX &&
        gestureState.moveX < this.state.likeX + this.state.likeXwidth &&
        gestureState.moveY > this.state.likeY &&
        gestureState.moveY < this.state.likeY + this.state.likeYheight
      ) {
        console.log('on like');
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (
        gestureState.moveX > this.state.likeX &&
        gestureState.moveX < this.state.likeX + this.state.likeXwidth &&
        gestureState.moveY > this.state.likeY &&
        gestureState.moveY < this.state.likeY + this.state.likeYheight
      ) {
        console.log('like added');
      }
      clearTimeout(this.long_press_timeout);
      Animated.timing(this.picScale, {
        toValue: 0,
        useNativeDriver: true,
      }).start(
        this.setState({
          selected: false,
          selecteduri:
            'https://yourstrulyindia.com/wp-content/uploads/2019/06/placeholder.jpg',
          likeX: null,
          likeXwidth: null,
          likeY: null,
          likeYheight: null,

          CommentX: null,
          CommentXwidth: null,
          CommentY: null,
          CommentYheight: null,

          moreX: null,
          moreXwidth: null,
          moreY: null,
          moreYheight: null,
        }),
      );

      console.log('Finger pulled up from the image');
    },
  });

  render() {
    const previewScale = this.picScale.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    });
    const previewOpacity = this.picScale.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });
    return (
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          style={{alignSelf: 'center', alignContent: 'center'}}
          data={images}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log('pressed');
                }}>
                <Img
                  style={{width: 150, height: 150, margin: 10}}
                  source={{
                    uri: item,
                  }}
                  resizeMode="cover"
                  {...this.panResponder.panHandlers}
                />
              </TouchableOpacity>
            );
          }}
        />
        {this.state.selected ? (
          <BlurView
            intensity={100}
            style={{...StyleSheet.absoluteFill}}
            tint="dark">
            <Text
              style={{
                position: 'absolute',
                top: this.state.likeY + this.state.likeYheight / 2,
                left: this.state.likeX + this.state.likeXwidth / 2,
                fontSize: 20,
                zIndex: 99,
                elevation: 10,
              }}>
              😀
            </Text>
            <Animated.View
              style={{
                backgroundColor: '#fff',
                paddingTop: 20,
                borderRadius: 10,
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                opacity: previewOpacity,
                transform: [{scale: previewScale}],
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width * 0.8,
                }}
                uri={this.state.selecteduri}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'space-around',
                }}>
                <Text
                  onLayout={this.handleMeasure('like', this.likeRef)}
                  ref={this.likeRef}
                  // allowFontScaling
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    textAlignVertical: 'auto',
                    // backgroundColor: 'pink',
                    height: '100%',
                    fontSize: 23,
                    padding: 15,
                  }}>
                  ♥
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    textAlignVertical: 'auto',
                    marginTop: 10,
                  }}>
                  Comment
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    textAlignVertical: 'auto',
                    marginTop: 10,
                  }}>
                  More
                </Text>
              </View>
            </Animated.View>
          </BlurView>
        ) : null}
      </View>
    );
  }
}

export default App;
