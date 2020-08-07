/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

const height = Dimensions.get('screen').height;
axios.defaults.baseURL = 'http://10.0.2.2:3000/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      selecteduri: '',
      data: [],
    };
  }

  componentDidMount = () => {
    console.log('starting');
    axios
      .get('users/getUploads')
      .then((res) => {
        console.log('in---------');
        console.log(res.data);
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  yPos = new Animated.Value(0);
  scale = new Animated.Value(0);
  headerPos = new Animated.Value(0);

  picScale = () => {
    Animated.timing(this.scale, {
      toValue: 1,
      delay: 100,
      useNativeDriver: true,
    });
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      // console.log(this.yPos);
      this.yPos.setOffset(this.yPos.__getValue());
    },
    onPanResponderMove: (e, gestureState) => {
      // if (gestureState.vy > 2 || gestureState.moveY > 500) {
      //   Animated.timing(this.yPos, {
      //     toValue: height,
      //     delay: 1000,
      //     useNativeDriver: true,
      //   }).start(() => {
      //     this.setState({
      //       selected: false,
      //       selecteduri: '',
      //     });
      //   });
      //   this.yPos.setValue(0);
      // } else {
      gestureState.dy > 0 ? this.yPos.setValue(gestureState.dy) : null;
      // }
      // console.log(gestureState);
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.vy > 2 || gestureState.dy > 300) {
        Animated.timing(this.yPos, {
          toValue: height,
          useNativeDriver: true,
        }).start(() => {
          this.setState({
            selected: false,
            selecteduri: '',
          });
          this.yPos.setValue(0);
        });
      } else {
        // this.yPos.setValue(0);
        Animated.timing(this.yPos, {
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          this.yPos.setValue(0);
        });
      }
      this.yPos.flattenOffset();
      console.log(gestureState);
    },
  });

  render() {
    const headerTop = this.headerPos.interpolate({
      inputRange: [0, 100],
      outputRange: [70, 0],
      extrapolate: 'clamp',
    });
    const headerText = this.headerPos.interpolate({
      inputRange: [0, 100],
      outputRange: [20, 5],
      extrapolate: 'clamp',
    });
    return (
      <View>
        <Animated.View
          style={{
            backgroundColor: 'transparent',
            height: headerTop,
          }}>
          <Animated.Text
            style={{
              fontSize: headerText,
              textAlign: 'center',
              textAlignVertical: 'center',
              flex: 1,
            }}>
            Welcome to Animation Practice
          </Animated.Text>
        </Animated.View>
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.headerPos,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}>
          {this.state.data.map((u, i) => {
            console.log(
              `http://192.168.0.105:3000/uploads/${u.imgName}`,
              '------->',
            );
            return (
              <TouchableOpacity
                onPress={() => {
                  this.yPos.setValue(0);
                  this.setState({
                    selected: true,
                    selecteduri: `http://192.168.0.105:3000/uploads/${u.imgName}`,
                  });
                  this.picScale();
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: '100%', height: 250, marginTop: 20}}
                  source={{
                    uri: `http://192.168.0.105:3000/uploads/${u.imgName}`,
                  }}
                />
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              this.yPos.setValue(0);
              this.setState({
                selected: true,
                selecteduri:
                  'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
              });
              this.picScale();
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: 250, marginTop: 20}}
              source={{
                uri:
                  'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                selected: true,
                selecteduri:
                  'https://analyticsindiamag.com/wp-content/uploads/2019/11/Image-Processing-Libraries.jpg',
              });
              this.picScale();
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: 250, marginTop: 50}}
              source={{
                uri:
                  'https://analyticsindiamag.com/wp-content/uploads/2019/11/Image-Processing-Libraries.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                selected: true,
                selecteduri:
                  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              });
              this.picScale();
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: 250, marginTop: 50}}
              source={{
                uri:
                  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                selected: true,
                selecteduri:
                  'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
              });
              this.picScale();
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: 250, marginTop: 50}}
              source={{
                uri:
                  'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
              }}
            />
          </TouchableOpacity>
        </ScrollView>
        {this.state.selected ? (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              bottom: 0,
              backgroundColor: '#000000',
              opacity: 0.9,
              transform: [{translateY: this.yPos}],
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: '100%',
                height: 250,
                marginTop: 50,
                alignSelf: 'center',
                backgroundColor: '#fff',
              }}
              source={{
                uri: this.state.selecteduri,
              }}
            />
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default App;
