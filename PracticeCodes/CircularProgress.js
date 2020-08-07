import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Svg, Circle, Text as SVGText} from 'react-native-svg';

export default class CircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  progressPercent = 45;
  size = 200;
  strokeWidth = this.size * 0.1;
  text = '45%';
  radius = (this.size - this.strokeWidth) / 2;
  circum = this.radius * 2 * Math.PI;
  svgProgress = 100 - this.progressPercent;

  render() {
    return (
      <View
        style={{
          // flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Svg width={this.size} height={this.size}>
          {/* Background Circle */}
          <Circle
            stroke={'#00000050'}
            fill="none"
            cx={this.size / 2}
            cy={this.size / 2}
            r={this.radius}
            {...{strokeWidth: this.strokeWidth}}
          />

          {/* Progress Circle */}
          <Circle
            stroke={'#3b5998'}
            fill="none"
            cx={this.size / 2}
            cy={this.size / 2}
            r={this.radius}
            strokeDasharray={`${this.circum} ${this.circum}`}
            strokeDashoffset={
              this.radius * Math.PI * 2 * (this.svgProgress / 100)
            }
            strokeLinecap="round"
            transform={`rotate(-90, ${this.size / 2}, ${this.size / 2})`}
            {...{strokeWidth: this.strokeWidth}}
          />

          {/* Text */}
          <SVGText
            fontSize={10}
            x={this.size / 2}
            y={this.size / 2 + 5}
            textAnchor="middle"
            fill={'#333333'}>
            {this.text}
          </SVGText>
        </Svg>
      </View>
    );
  }
}
