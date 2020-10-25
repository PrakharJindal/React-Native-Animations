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
  FlatList,
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Image from 'react-native-auto-scale-image';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('screen');

const images = [
  'https://media.cntraveler.com/photos/5cb63a516b5c4d33c25ec158/master/w_4000,h_2667,c_limit/Zakynthos-Greece_GettyImages-626977447.jpg',
  'https://randomwordgenerator.com/img/picture-generator/55e4d1414352ac14f1dc8460962e33791c3ad6e04e507441722a72dc944ccd_640.jpg',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
  'https://cdn.cheapism.com/images/011618_most_beautiful_views_in_the_world_sli.max-784x410_ZXOqfVp.jpg',
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
  picView = new Animated.Value(0);

  componentDidMount() {
    this.picView.setValue(0);
    this.picScale.setValue(0);
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      var uri = e._targetInst.memoizedProps.source.uri;
      this.long_press_timeout = setTimeout(() => {
        this.setState({
          selected: true,
          selecteduri: uri,
        });
        Animated.parallel([
          Animated.timing(this.picView, {
            toValue: 1,
            useNativeDriver: true,
            duration: 0,
          }),
          Animated.spring(this.picScale, {
            toValue: 1,
            useNativeDriver: true,
            duration: 50,
            easing: Easing.bounce,
          }),
        ]).start(() => {});
      }, 50);
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
      Animated.timing(this.picView, {
        toValue: 0,
        useNativeDriver: true,
        // delay: 10,
      }).start();
      Animated.spring(this.picScale, {
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
    const previewView = this.picView.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const previewOpacity = this.picScale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <View style={{flex: 1, overflow: 'hidden', backgroundColor: '#262626'}}>
        <FlatList
          numColumns={3}
          contentContainerStyle={{marginHorizontal: 1}}
          data={images}
          keyExtractor={(item, index) => {
            return `${item}${index}`;
          }}
          ListHeaderComponent={() => {
            return (
              <View style={{paddingTop: 60}}>
                <Img
                  source={{
                    uri:
                      'https://randomwordgenerator.com/img/picture-generator/52e9d1474c56ab14f1dc8460962e33791c3ad6e04e507749772772d6944bc2_640.jpg',
                  }}
                  style={{
                    width: width / 3.5,
                    height: width / 3.5,
                    borderRadius: width,
                    margin: 10,
                  }}
                />
                <View style={{margin: 20}}>
                  <Text
                    style={{
                      color: '#E3E3E3',
                      lineHeight: 22,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Beautiful Views Of Nature
                  </Text>
                  <Text
                    style={{color: '#E3E3E3', lineHeight: 22, fontSize: 15}}>
                    We love everything this beautiful Earth has to offer! {'\n'}
                    Tag us in your favorite displays of Mother Nature!
                  </Text>
                </View>
              </View>
            );
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  console.log('pressed');
                }}>
                <Img
                  style={{width: width / 3, height: width / 3, margin: 1}}
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
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              opacity: previewOpacity,
            }}>
            <BlurView
              style={{...StyleSheet.absoluteFill, zIndex: 0}}
              blurAmount={1}
              overlayColor="#00000060"
              reducedTransparencyFallbackColor="white"
              blurType="dark">
              <Animated.View
                style={{
                  backgroundColor: '#262626',
                  paddingTop: 10,
                  borderRadius: 10,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  opacity: previewOpacity,
                  transform: [{scale: previewScale}],
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Img
                    source={{
                      uri:
                        'https://randomwordgenerator.com/img/picture-generator/52e9d1474c56ab14f1dc8460962e33791c3ad6e04e507749772772d6944bc2_640.jpg',
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                    }}
                  />
                  <Text
                    style={{color: '#E3E3E3', fontSize: 18, marginLeft: 10}}>
                    Beautiful Views Of Nature
                  </Text>
                </View>
                <Image
                  style={{
                    width: Dimensions.get('screen').width * 0.95,
                    marginTop: 10,
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
                    <Icon name="heart" size={25} color="#E3E3E3" />
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      textAlignVertical: 'auto',
                      height: '100%',
                      fontSize: 23,
                      padding: 15,
                      transform: [{rotateY: '180deg'}],
                    }}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={25}
                      color="#E3E3E3"
                    />
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      textAlignVertical: 'auto',
                      height: '100%',
                      fontSize: 23,
                      padding: 15,
                    }}>
                    <Feather name="send" size={25} color="#E3E3E3" />
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      textAlignVertical: 'auto',
                      height: '100%',
                      fontSize: 23,
                      padding: 15,
                    }}>
                    <Feather name="more-vertical" size={25} color="#E3E3E3" />
                  </Text>
                </View>
              </Animated.View>
            </BlurView>
          </Animated.View>
        ) : (
          <Text
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            Open
          </Text>
        )}
      </View>
    );
  }
}

export default App;
