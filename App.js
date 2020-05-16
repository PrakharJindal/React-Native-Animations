import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Index from './PracticeCodes/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    );
  }
}

export default App;
