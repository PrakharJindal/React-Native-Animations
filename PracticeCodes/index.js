import React, {Component} from 'react';
import {View, Text, Animated} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AnimatedClock from './AnimatedClock';
import AnimatedLoader from './AnimatedLoader';
import ImageViewer from './ImageViewer&Header';
import InstaImagePreview from './InstaImagePreview';
import InstaImageZoom from './InstaImageZoom';
import MoveBallTouch from './Move BallTouch';
import MoveBallBiggner from './MoveBallBiggner';
import SVGAnimation from './SVGAnimation';
import ImageViewer2 from './ImageViewer&Header2';
const Drawer = createDrawerNavigator();

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="ImageViewer2" component={ImageViewer2} />
        <Drawer.Screen name="SVGAnimation" component={SVGAnimation} />
        <Drawer.Screen name="InstaImagePreview" component={InstaImagePreview} />
        <Drawer.Screen name="AnimatedClock" component={AnimatedClock} />
        <Drawer.Screen name="AnimatedLoader" component={AnimatedLoader} />
        <Drawer.Screen name="ImageViewer" component={ImageViewer} />
        <Drawer.Screen name="InstaImageZoom" component={InstaImageZoom} />
        <Drawer.Screen name="MoveBallTouch" component={MoveBallTouch} />
        <Drawer.Screen name="MoveBallBiggner" component={MoveBallBiggner} />
      </Drawer.Navigator>
    );
  }
}

export default index;
