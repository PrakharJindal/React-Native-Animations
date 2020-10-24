/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  Button,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {interpolate} from 'flubber'; // ES6
import {tween, easing} from 'popmotion';
import {modulo} from 'react-native-reanimated';
// import {motion} from 'framer-motion';
import * as shape from 'd3-shape';
import {AnimatedSVGPaths, AnimatedSVGPath} from 'react-native-svg-animations';

const {width} = Dimensions.get('screen');
const height = 64;

class SVGAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bac: '#123',
      rot: '0deg',
      path:
        'M0,288L6.7,256C13.3,224,27,160,40,138.7C53.3,117,67,139,80,128C93.3,117,107,75,120,80C133.3,85,147,139,160,181.3C173.3,224,187,256,200,272C213.3,288,227,288,240,288C253.3,288,267,288,280,272C293.3,256,307,224,320,224C333.3,224,347,256,360,229.3C373.3,203,387,117,400,101.3C413.3,85,427,139,440,149.3C453.3,160,467,128,480,117.3C493.3,107,507,117,520,149.3C533.3,181,547,235,560,256C573.3,277,587,267,600,229.3C613.3,192,627,128,640,122.7C653.3,117,667,171,680,160C693.3,149,707,75,720,53.3C733.3,32,747,64,760,96C773.3,128,787,160,800,170.7C813.3,181,827,171,840,181.3C853.3,192,867,224,880,240C893.3,256,907,256,920,224C933.3,192,947,128,960,133.3C973.3,139,987,213,1000,208C1013.3,203,1027,117,1040,80C1053.3,43,1067,53,1080,101.3C1093.3,149,1107,235,1120,234.7C1133.3,235,1147,149,1160,128C1173.3,107,1187,149,1200,176C1213.3,203,1227,213,1240,202.7C1253.3,192,1267,160,1280,122.7C1293.3,85,1307,43,1320,32C1333.3,21,1347,43,1360,74.7C1373.3,107,1387,149,1400,149.3C1413.3,149,1427,107,1433,85.3L1440,64L1440,0L1433.3,0C1426.7,0,1413,0,1400,0C1386.7,0,1373,0,1360,0C1346.7,0,1333,0,1320,0C1306.7,0,1293,0,1280,0C1266.7,0,1253,0,1240,0C1226.7,0,1213,0,1200,0C1186.7,0,1173,0,1160,0C1146.7,0,1133,0,1120,0C1106.7,0,1093,0,1080,0C1066.7,0,1053,0,1040,0C1026.7,0,1013,0,1000,0C986.7,0,973,0,960,0C946.7,0,933,0,920,0C906.7,0,893,0,880,0C866.7,0,853,0,840,0C826.7,0,813,0,800,0C786.7,0,773,0,760,0C746.7,0,733,0,720,0C706.7,0,693,0,680,0C666.7,0,653,0,640,0C626.7,0,613,0,600,0C586.7,0,573,0,560,0C546.7,0,533,0,520,0C506.7,0,493,0,480,0C466.7,0,453,0,440,0C426.7,0,413,0,400,0C386.7,0,373,0,360,0C346.7,0,333,0,320,0C306.7,0,293,0,280,0C266.7,0,253,0,240,0C226.7,0,213,0,200,0C186.7,0,173,0,160,0C146.7,0,133,0,120,0C106.7,0,93,0,80,0C66.7,0,53,0,40,0C26.7,0,13,0,7,0L0,0Z',
    };
  }

  tabs = [
    {
      name: 'grid',
    },
    {
      name: 'list',
    },
    {
      name: 'repeat',
    },
    {
      name: 'map',
    },
    {
      name: 'user',
    },
  ];
  tabWidth = width / this.tabs.length;
  backgroundColor = 'lightblue';

  sc = new Animated.Value(0);
  svg = [
    'M0,288L6.7,256C13.3,224,27,160,40,138.7C53.3,117,67,139,80,128C93.3,117,107,75,120,80C133.3,85,147,139,160,181.3C173.3,224,187,256,200,272C213.3,288,227,288,240,288C253.3,288,267,288,280,272C293.3,256,307,224,320,224C333.3,224,347,256,360,229.3C373.3,203,387,117,400,101.3C413.3,85,427,139,440,149.3C453.3,160,467,128,480,117.3C493.3,107,507,117,520,149.3C533.3,181,547,235,560,256C573.3,277,587,267,600,229.3C613.3,192,627,128,640,122.7C653.3,117,667,171,680,160C693.3,149,707,75,720,53.3C733.3,32,747,64,760,96C773.3,128,787,160,800,170.7C813.3,181,827,171,840,181.3C853.3,192,867,224,880,240C893.3,256,907,256,920,224C933.3,192,947,128,960,133.3C973.3,139,987,213,1000,208C1013.3,203,1027,117,1040,80C1053.3,43,1067,53,1080,101.3C1093.3,149,1107,235,1120,234.7C1133.3,235,1147,149,1160,128C1173.3,107,1187,149,1200,176C1213.3,203,1227,213,1240,202.7C1253.3,192,1267,160,1280,122.7C1293.3,85,1307,43,1320,32C1333.3,21,1347,43,1360,74.7C1373.3,107,1387,149,1400,149.3C1413.3,149,1427,107,1433,85.3L1440,64L1440,0L1433.3,0C1426.7,0,1413,0,1400,0C1386.7,0,1373,0,1360,0C1346.7,0,1333,0,1320,0C1306.7,0,1293,0,1280,0C1266.7,0,1253,0,1240,0C1226.7,0,1213,0,1200,0C1186.7,0,1173,0,1160,0C1146.7,0,1133,0,1120,0C1106.7,0,1093,0,1080,0C1066.7,0,1053,0,1040,0C1026.7,0,1013,0,1000,0C986.7,0,973,0,960,0C946.7,0,933,0,920,0C906.7,0,893,0,880,0C866.7,0,853,0,840,0C826.7,0,813,0,800,0C786.7,0,773,0,760,0C746.7,0,733,0,720,0C706.7,0,693,0,680,0C666.7,0,653,0,640,0C626.7,0,613,0,600,0C586.7,0,573,0,560,0C546.7,0,533,0,520,0C506.7,0,493,0,480,0C466.7,0,453,0,440,0C426.7,0,413,0,400,0C386.7,0,373,0,360,0C346.7,0,333,0,320,0C306.7,0,293,0,280,0C266.7,0,253,0,240,0C226.7,0,213,0,200,0C186.7,0,173,0,160,0C146.7,0,133,0,120,0C106.7,0,93,0,80,0C66.7,0,53,0,40,0C26.7,0,13,0,7,0L0,0Z',
    'M0,224L6.7,186.7C13.3,149,27,75,40,58.7C53.3,43,67,85,80,117.3C93.3,149,107,171,120,192C133.3,213,147,235,160,245.3C173.3,256,187,256,200,234.7C213.3,213,227,171,240,138.7C253.3,107,267,85,280,96C293.3,107,307,149,320,144C333.3,139,347,85,360,106.7C373.3,128,387,224,400,272C413.3,320,427,320,440,309.3C453.3,299,467,277,480,229.3C493.3,181,507,107,520,106.7C533.3,107,547,181,560,176C573.3,171,587,85,600,42.7C613.3,0,627,0,640,32C653.3,64,667,128,680,133.3C693.3,139,707,85,720,101.3C733.3,117,747,203,760,240C773.3,277,787,267,800,234.7C813.3,203,827,149,840,144C853.3,139,867,181,880,186.7C893.3,192,907,160,920,165.3C933.3,171,947,213,960,218.7C973.3,224,987,192,1000,170.7C1013.3,149,1027,139,1040,117.3C1053.3,96,1067,64,1080,42.7C1093.3,21,1107,11,1120,37.3C1133.3,64,1147,128,1160,138.7C1173.3,149,1187,107,1200,96C1213.3,85,1227,107,1240,112C1253.3,117,1267,107,1280,117.3C1293.3,128,1307,160,1320,176C1333.3,192,1347,192,1360,181.3C1373.3,171,1387,149,1400,133.3C1413.3,117,1427,107,1433,101.3L1440,96L1440,0L1433.3,0C1426.7,0,1413,0,1400,0C1386.7,0,1373,0,1360,0C1346.7,0,1333,0,1320,0C1306.7,0,1293,0,1280,0C1266.7,0,1253,0,1240,0C1226.7,0,1213,0,1200,0C1186.7,0,1173,0,1160,0C1146.7,0,1133,0,1120,0C1106.7,0,1093,0,1080,0C1066.7,0,1053,0,1040,0C1026.7,0,1013,0,1000,0C986.7,0,973,0,960,0C946.7,0,933,0,920,0C906.7,0,893,0,880,0C866.7,0,853,0,840,0C826.7,0,813,0,800,0C786.7,0,773,0,760,0C746.7,0,733,0,720,0C706.7,0,693,0,680,0C666.7,0,653,0,640,0C626.7,0,613,0,600,0C586.7,0,573,0,560,0C546.7,0,533,0,520,0C506.7,0,493,0,480,0C466.7,0,453,0,440,0C426.7,0,413,0,400,0C386.7,0,373,0,360,0C346.7,0,333,0,320,0C306.7,0,293,0,280,0C266.7,0,253,0,240,0C226.7,0,213,0,200,0C186.7,0,173,0,160,0C146.7,0,133,0,120,0C106.7,0,93,0,80,0C66.7,0,53,0,40,0C26.7,0,13,0,7,0L0,0Z',
    'M0,160L7.5,154.7C15,149,30,139,45,138.7C60,139,75,149,90,165.3C105,181,120,203,135,213.3C150,224,165,224,180,234.7C195,245,210,267,225,266.7C240,267,255,245,270,218.7C285,192,300,160,315,176C330,192,345,256,360,277.3C375,299,390,277,405,240C420,203,435,149,450,154.7C465,160,480,224,495,245.3C510,267,525,245,540,213.3C555,181,570,139,585,149.3C600,160,615,224,630,218.7C645,213,660,139,675,112C690,85,705,107,720,138.7C735,171,750,213,765,234.7C780,256,795,256,810,250.7C825,245,840,235,855,224C870,213,885,203,900,202.7C915,203,930,213,945,229.3C960,245,975,267,990,266.7C1005,267,1020,245,1035,224C1050,203,1065,181,1080,186.7C1095,192,1110,224,1125,229.3C1140,235,1155,213,1170,186.7C1185,160,1200,128,1215,144C1230,160,1245,224,1260,224C1275,224,1290,160,1305,128C1320,96,1335,96,1350,106.7C1365,117,1380,139,1395,176C1410,213,1425,267,1433,293.3L1440,320L1440,0L1432.5,0C1425,0,1410,0,1395,0C1380,0,1365,0,1350,0C1335,0,1320,0,1305,0C1290,0,1275,0,1260,0C1245,0,1230,0,1215,0C1200,0,1185,0,1170,0C1155,0,1140,0,1125,0C1110,0,1095,0,1080,0C1065,0,1050,0,1035,0C1020,0,1005,0,990,0C975,0,960,0,945,0C930,0,915,0,900,0C885,0,870,0,855,0C840,0,825,0,810,0C795,0,780,0,765,0C750,0,735,0,720,0C705,0,690,0,675,0C660,0,645,0,630,0C615,0,600,0,585,0C570,0,555,0,540,0C525,0,510,0,495,0C480,0,465,0,450,0C435,0,420,0,405,0C390,0,375,0,360,0C345,0,330,0,315,0C300,0,285,0,270,0C255,0,240,0,225,0C210,0,195,0,180,0C165,0,150,0,135,0C120,0,105,0,90,0C75,0,60,0,45,0C30,0,15,0,8,0L0,0Z',
    'M0,288L7.5,288C15,288,30,288,45,261.3C60,235,75,181,90,154.7C105,128,120,128,135,122.7C150,117,165,107,180,101.3C195,96,210,96,225,80C240,64,255,32,270,21.3C285,11,300,21,315,21.3C330,21,345,11,360,37.3C375,64,390,128,405,149.3C420,171,435,149,450,128C465,107,480,85,495,106.7C510,128,525,192,540,229.3C555,267,570,277,585,282.7C600,288,615,288,630,266.7C645,245,660,203,675,197.3C690,192,705,224,720,229.3C735,235,750,213,765,186.7C780,160,795,128,810,149.3C825,171,840,245,855,266.7C870,288,885,256,900,240C915,224,930,224,945,197.3C960,171,975,117,990,128C1005,139,1020,213,1035,250.7C1050,288,1065,288,1080,266.7C1095,245,1110,203,1125,170.7C1140,139,1155,117,1170,106.7C1185,96,1200,96,1215,112C1230,128,1245,160,1260,144C1275,128,1290,64,1305,74.7C1320,85,1335,171,1350,176C1365,181,1380,107,1395,80C1410,53,1425,75,1433,85.3L1440,96L1440,0L1432.5,0C1425,0,1410,0,1395,0C1380,0,1365,0,1350,0C1335,0,1320,0,1305,0C1290,0,1275,0,1260,0C1245,0,1230,0,1215,0C1200,0,1185,0,1170,0C1155,0,1140,0,1125,0C1110,0,1095,0,1080,0C1065,0,1050,0,1035,0C1020,0,1005,0,990,0C975,0,960,0,945,0C930,0,915,0,900,0C885,0,870,0,855,0C840,0,825,0,810,0C795,0,780,0,765,0C750,0,735,0,720,0C705,0,690,0,675,0C660,0,645,0,630,0C615,0,600,0,585,0C570,0,555,0,540,0C525,0,510,0,495,0C480,0,465,0,450,0C435,0,420,0,405,0C390,0,375,0,360,0C345,0,330,0,315,0C300,0,285,0,270,0C255,0,240,0,225,0C210,0,195,0,180,0C165,0,150,0,135,0C120,0,105,0,90,0C75,0,60,0,45,0C30,0,15,0,8,0L0,0Z',
    'M0,224L6.7,186.7C13.3,149,27,75,40,58.7C53.3,43,67,85,80,117.3C93.3,149,107,171,120,192C133.3,213,147,235,160,245.3C173.3,256,187,256,200,234.7C213.3,213,227,171,240,138.7C253.3,107,267,85,280,96C293.3,107,307,149,320,144C333.3,139,347,85,360,106.7C373.3,128,387,224,400,272C413.3,320,427,320,440,309.3C453.3,299,467,277,480,229.3C493.3,181,507,107,520,106.7C533.3,107,547,181,560,176C573.3,171,587,85,600,42.7C613.3,0,627,0,640,32C653.3,64,667,128,680,133.3C693.3,139,707,85,720,101.3C733.3,117,747,203,760,240C773.3,277,787,267,800,234.7C813.3,203,827,149,840,144C853.3,139,867,181,880,186.7C893.3,192,907,160,920,165.3C933.3,171,947,213,960,218.7C973.3,224,987,192,1000,170.7C1013.3,149,1027,139,1040,117.3C1053.3,96,1067,64,1080,42.7C1093.3,21,1107,11,1120,37.3C1133.3,64,1147,128,1160,138.7C1173.3,149,1187,107,1200,96C1213.3,85,1227,107,1240,112C1253.3,117,1267,107,1280,117.3C1293.3,128,1307,160,1320,176C1333.3,192,1347,192,1360,181.3C1373.3,171,1387,149,1400,133.3C1413.3,117,1427,107,1433,101.3L1440,96L1440,0L1433.3,0C1426.7,0,1413,0,1400,0C1386.7,0,1373,0,1360,0C1346.7,0,1333,0,1320,0C1306.7,0,1293,0,1280,0C1266.7,0,1253,0,1240,0C1226.7,0,1213,0,1200,0C1186.7,0,1173,0,1160,0C1146.7,0,1133,0,1120,0C1106.7,0,1093,0,1080,0C1066.7,0,1053,0,1040,0C1026.7,0,1013,0,1000,0C986.7,0,973,0,960,0C946.7,0,933,0,920,0C906.7,0,893,0,880,0C866.7,0,853,0,840,0C826.7,0,813,0,800,0C786.7,0,773,0,760,0C746.7,0,733,0,720,0C706.7,0,693,0,680,0C666.7,0,653,0,640,0C626.7,0,613,0,600,0C586.7,0,573,0,560,0C546.7,0,533,0,520,0C506.7,0,493,0,480,0C466.7,0,453,0,440,0C426.7,0,413,0,400,0C386.7,0,373,0,360,0C346.7,0,333,0,320,0C306.7,0,293,0,280,0C266.7,0,253,0,240,0C226.7,0,213,0,200,0C186.7,0,173,0,160,0C146.7,0,133,0,120,0C106.7,0,93,0,80,0C66.7,0,53,0,40,0C26.7,0,13,0,7,0L0,0Z',
    'M0,288L6.7,256C13.3,224,27,160,40,138.7C53.3,117,67,139,80,128C93.3,117,107,75,120,80C133.3,85,147,139,160,181.3C173.3,224,187,256,200,272C213.3,288,227,288,240,288C253.3,288,267,288,280,272C293.3,256,307,224,320,224C333.3,224,347,256,360,229.3C373.3,203,387,117,400,101.3C413.3,85,427,139,440,149.3C453.3,160,467,128,480,117.3C493.3,107,507,117,520,149.3C533.3,181,547,235,560,256C573.3,277,587,267,600,229.3C613.3,192,627,128,640,122.7C653.3,117,667,171,680,160C693.3,149,707,75,720,53.3C733.3,32,747,64,760,96C773.3,128,787,160,800,170.7C813.3,181,827,171,840,181.3C853.3,192,867,224,880,240C893.3,256,907,256,920,224C933.3,192,947,128,960,133.3C973.3,139,987,213,1000,208C1013.3,203,1027,117,1040,80C1053.3,43,1067,53,1080,101.3C1093.3,149,1107,235,1120,234.7C1133.3,235,1147,149,1160,128C1173.3,107,1187,149,1200,176C1213.3,203,1227,213,1240,202.7C1253.3,192,1267,160,1280,122.7C1293.3,85,1307,43,1320,32C1333.3,21,1347,43,1360,74.7C1373.3,107,1387,149,1400,149.3C1413.3,149,1427,107,1433,85.3L1440,64L1440,0L1433.3,0C1426.7,0,1413,0,1400,0C1386.7,0,1373,0,1360,0C1346.7,0,1333,0,1320,0C1306.7,0,1293,0,1280,0C1266.7,0,1253,0,1240,0C1226.7,0,1213,0,1200,0C1186.7,0,1173,0,1160,0C1146.7,0,1133,0,1120,0C1106.7,0,1093,0,1080,0C1066.7,0,1053,0,1040,0C1026.7,0,1013,0,1000,0C986.7,0,973,0,960,0C946.7,0,933,0,920,0C906.7,0,893,0,880,0C866.7,0,853,0,840,0C826.7,0,813,0,800,0C786.7,0,773,0,760,0C746.7,0,733,0,720,0C706.7,0,693,0,680,0C666.7,0,653,0,640,0C626.7,0,613,0,600,0C586.7,0,573,0,560,0C546.7,0,533,0,520,0C506.7,0,493,0,480,0C466.7,0,453,0,440,0C426.7,0,413,0,400,0C386.7,0,373,0,360,0C346.7,0,333,0,320,0C306.7,0,293,0,280,0C266.7,0,253,0,240,0C226.7,0,213,0,200,0C186.7,0,173,0,160,0C146.7,0,133,0,120,0C106.7,0,93,0,80,0C66.7,0,53,0,40,0C26.7,0,13,0,7,0L0,0Z',
    'M0,288L7.5,288C15,288,30,288,45,261.3C60,235,75,181,90,154.7C105,128,120,128,135,122.7C150,117,165,107,180,101.3C195,96,210,96,225,80C240,64,255,32,270,21.3C285,11,300,21,315,21.3C330,21,345,11,360,37.3C375,64,390,128,405,149.3C420,171,435,149,450,128C465,107,480,85,495,106.7C510,128,525,192,540,229.3C555,267,570,277,585,282.7C600,288,615,288,630,266.7C645,245,660,203,675,197.3C690,192,705,224,720,229.3C735,235,750,213,765,186.7C780,160,795,128,810,149.3C825,171,840,245,855,266.7C870,288,885,256,900,240C915,224,930,224,945,197.3C960,171,975,117,990,128C1005,139,1020,213,1035,250.7C1050,288,1065,288,1080,266.7C1095,245,1110,203,1125,170.7C1140,139,1155,117,1170,106.7C1185,96,1200,96,1215,112C1230,128,1245,160,1260,144C1275,128,1290,64,1305,74.7C1320,85,1335,171,1350,176C1365,181,1380,107,1395,80C1410,53,1425,75,1433,85.3L1440,96L1440,0L1432.5,0C1425,0,1410,0,1395,0C1380,0,1365,0,1350,0C1335,0,1320,0,1305,0C1290,0,1275,0,1260,0C1245,0,1230,0,1215,0C1200,0,1185,0,1170,0C1155,0,1140,0,1125,0C1110,0,1095,0,1080,0C1065,0,1050,0,1035,0C1020,0,1005,0,990,0C975,0,960,0,945,0C930,0,915,0,900,0C885,0,870,0,855,0C840,0,825,0,810,0C795,0,780,0,765,0C750,0,735,0,720,0C705,0,690,0,675,0C660,0,645,0,630,0C615,0,600,0,585,0C570,0,555,0,540,0C525,0,510,0,495,0C480,0,465,0,450,0C435,0,420,0,405,0C390,0,375,0,360,0C345,0,330,0,315,0C300,0,285,0,270,0C255,0,240,0,225,0C210,0,195,0,180,0C165,0,150,0,135,0C120,0,105,0,90,0C75,0,60,0,45,0C30,0,15,0,8,0L0,0Z',
  ];
  svgText = [
    'M8.88719 8.04V21.06C8.88719 21.38 9.06719 21.54 9.42719 21.54H12.4272C19.5472 21.54 23.1072 19 23.1072 13.92C23.1072 9.4 19.8072 7.14 13.2072 7.14C12.0072 7.14 10.7472 7.24 9.42719 7.44C9.06719 7.52 8.88719 7.72 8.88719 8.04ZM4.02719 45C3.10719 45 2.30719 44.66 1.62719 43.98C0.947188 43.3 0.607188 42.5 0.607188 41.58V4.92C0.607188 3.96 0.927188 3.1 1.56719 2.34C2.20719 1.58 3.00719 1.16 3.96719 1.08C7.36719 0.759999 10.6472 0.599999 13.8072 0.599999C19.6872 0.599999 24.0872 1.7 27.0072 3.9C29.9272 6.06 31.3872 9.12 31.3872 13.08C31.3872 15.92 30.6072 18.42 29.0472 20.58C27.5272 22.74 25.4672 24.26 22.8672 25.14C22.8272 25.14 22.8072 25.16 22.8072 25.2C22.8072 25.28 22.8272 25.32 22.8672 25.32C24.7872 26.52 26.4272 28.88 27.7872 32.4L31.3872 41.82C31.6672 42.58 31.5672 43.3 31.0872 43.98C30.6472 44.66 30.0272 45 29.2272 45H27.3672C26.3272 45 25.3872 44.72 24.5472 44.16C23.7072 43.56 23.1072 42.78 22.7472 41.82L19.3872 32.58C18.6672 30.66 17.8472 29.4 16.9272 28.8C16.0072 28.2 14.4272 27.9 12.1872 27.9H9.42719C9.06719 27.9 8.88719 28.08 8.88719 28.44V41.58C8.88719 42.5 8.54719 43.3 7.86719 43.98C7.22719 44.66 6.44719 45 5.52719 45H4.02719ZM42.0545 45C41.1345 45 40.3345 44.66 39.6545 43.98C38.9745 43.3 38.6345 42.5 38.6345 41.58V4.62C38.6345 3.7 38.9745 2.9 39.6545 2.22C40.3345 1.54 41.1345 1.2 42.0545 1.2H62.4545C63.3745 1.2 64.1745 1.54 64.8545 2.22C65.5345 2.9 65.8745 3.7 65.8745 4.62C65.8745 5.54 65.5345 6.34 64.8545 7.02C64.1745 7.66 63.3745 7.98 62.4545 7.98H47.5745C47.2145 7.98 47.0345 8.16 47.0345 8.52V18.18C47.0345 18.54 47.2145 18.72 47.5745 18.72H61.4345C62.3545 18.72 63.1145 19.04 63.7145 19.68C64.3545 20.32 64.6745 21.08 64.6745 21.96C64.6745 22.84 64.3545 23.6 63.7145 24.24C63.1145 24.84 62.3545 25.14 61.4345 25.14H47.5745C47.2145 25.14 47.0345 25.32 47.0345 25.68V37.68C47.0345 38.04 47.2145 38.22 47.5745 38.22H62.4545C63.3745 38.22 64.1745 38.56 64.8545 39.24C65.5345 39.88 65.8745 40.66 65.8745 41.58C65.8745 42.5 65.5345 43.3 64.8545 43.98C64.1745 44.66 63.3745 45 62.4545 45H42.0545ZM89.7883 8.64L84.5083 27.48C84.4683 27.6 84.4883 27.72 84.5683 27.84C84.6483 27.96 84.7483 28.02 84.8683 28.02H94.8283C94.9483 28.02 95.0483 27.96 95.1283 27.84C95.2083 27.72 95.2283 27.6 95.1883 27.48L89.9083 8.64C89.9083 8.6 89.8883 8.58 89.8483 8.58C89.8083 8.58 89.7883 8.6 89.7883 8.64ZM74.2483 45C73.4083 45 72.7483 44.66 72.2683 43.98C71.7883 43.3 71.6883 42.56 71.9683 41.76L84.3883 4.44C84.7483 3.48 85.3283 2.7 86.1283 2.1C86.9683 1.5 87.8883 1.2 88.8883 1.2H91.0483C92.0883 1.2 93.0083 1.5 93.8083 2.1C94.6483 2.7 95.2283 3.48 95.5483 4.44L107.968 41.76C108.248 42.56 108.148 43.3 107.668 43.98C107.188 44.66 106.528 45 105.688 45H103.528C102.568 45 101.668 44.7 100.828 44.1C100.028 43.46 99.4883 42.66 99.2083 41.7L97.2883 34.92C97.2483 34.6 97.0283 34.44 96.6283 34.44H83.0683C82.7083 34.44 82.4883 34.6 82.4083 34.92L80.4883 41.7C80.2483 42.66 79.7083 43.46 78.8683 44.1C78.0683 44.7 77.1683 45 76.1683 45H74.2483ZM129.991 45.6C123.671 45.6 118.651 43.66 114.931 39.78C111.251 35.86 109.411 30.3 109.411 23.1C109.411 15.98 111.191 10.46 114.751 6.54C118.351 2.58 123.371 0.599999 129.811 0.599999C132.771 0.599999 135.251 0.779999 137.251 1.14C138.211 1.3 139.011 1.78 139.651 2.58C140.291 3.38 140.611 4.28 140.611 5.28V5.76C140.611 6.6 140.251 7.26 139.531 7.74C138.851 8.22 138.111 8.36 137.311 8.16C135.351 7.64 133.151 7.38 130.711 7.38C126.751 7.38 123.631 8.74 121.351 11.46C119.111 14.18 117.991 18.06 117.991 23.1C117.991 28.1 119.151 31.98 121.471 34.74C123.831 37.46 126.971 38.82 130.891 38.82C133.531 38.82 135.791 38.58 137.671 38.1C138.471 37.9 139.211 38.04 139.891 38.52C140.611 39 140.971 39.66 140.971 40.5V40.92C140.971 41.92 140.651 42.82 140.011 43.62C139.411 44.38 138.611 44.84 137.611 45C135.331 45.4 132.791 45.6 129.991 45.6ZM150.887 8.16C149.967 8.16 149.167 7.84 148.487 7.2C147.807 6.52 147.467 5.72 147.467 4.8V4.62C147.467 3.7 147.807 2.9 148.487 2.22C149.167 1.54 149.967 1.2 150.887 1.2H176.447C177.367 1.2 178.167 1.54 178.847 2.22C179.527 2.9 179.867 3.7 179.867 4.62V4.8C179.867 5.72 179.527 6.52 178.847 7.2C178.167 7.84 177.367 8.16 176.447 8.16H168.407C168.087 8.16 167.927 8.34 167.927 8.7V41.58C167.927 42.5 167.587 43.3 166.907 43.98C166.227 44.66 165.427 45 164.507 45H162.827C161.907 45 161.107 44.66 160.427 43.98C159.747 43.3 159.407 42.5 159.407 41.58V8.7C159.407 8.34 159.247 8.16 158.927 8.16H150.887Z',
    'M3.54141 44C2.62141 44 1.82141 43.66 1.14141 42.98C0.501407 42.3 0.181406 41.5 0.181406 40.58V3.62C0.181406 2.7 0.501407 1.9 1.14141 1.22C1.82141 0.539998 2.62141 0.199999 3.54141 0.199999H4.86141C7.14141 0.199999 8.82141 1.2 9.90141 3.2L24.7214 29.96C24.7214 30 24.7414 30.02 24.7814 30.02C24.8214 30.02 24.8414 30 24.8414 29.96V3.62C24.8414 2.7 25.1814 1.9 25.8614 1.22C26.5414 0.539998 27.3414 0.199999 28.2614 0.199999H29.5814C30.5014 0.199999 31.2814 0.539998 31.9214 1.22C32.6014 1.9 32.9414 2.7 32.9414 3.62V40.58C32.9414 41.5 32.6014 42.3 31.9214 42.98C31.2814 43.66 30.5014 44 29.5814 44H28.2614C25.9814 44 24.3014 43 23.2214 41L8.40141 14.24C8.40141 14.2 8.38141 14.18 8.34141 14.18C8.30141 14.18 8.28141 14.2 8.28141 14.24V40.58C8.28141 41.5 7.94141 42.3 7.26141 42.98C6.58141 43.66 5.78141 44 4.86141 44H3.54141ZM57.4875 7.64L52.2075 26.48C52.1675 26.6 52.1875 26.72 52.2675 26.84C52.3475 26.96 52.4475 27.02 52.5675 27.02H62.5275C62.6475 27.02 62.7475 26.96 62.8275 26.84C62.9075 26.72 62.9275 26.6 62.8875 26.48L57.6075 7.64C57.6075 7.6 57.5875 7.58 57.5475 7.58C57.5075 7.58 57.4875 7.6 57.4875 7.64ZM41.9475 44C41.1075 44 40.4475 43.66 39.9675 42.98C39.4875 42.3 39.3875 41.56 39.6675 40.76L52.0875 3.44C52.4475 2.48 53.0275 1.7 53.8275 1.1C54.6675 0.499999 55.5875 0.199999 56.5875 0.199999H58.7475C59.7875 0.199999 60.7075 0.499999 61.5075 1.1C62.3475 1.7 62.9275 2.48 63.2475 3.44L75.6675 40.76C75.9475 41.56 75.8475 42.3 75.3675 42.98C74.8875 43.66 74.2275 44 73.3875 44H71.2275C70.2675 44 69.3675 43.7 68.5275 43.1C67.7275 42.46 67.1875 41.66 66.9075 40.7L64.9875 33.92C64.9475 33.6 64.7275 33.44 64.3275 33.44H50.7675C50.4075 33.44 50.1875 33.6 50.1075 33.92L48.1875 40.7C47.9475 41.66 47.4075 42.46 46.5675 43.1C45.7675 43.7 44.8675 44 43.8675 44H41.9475ZM76.9256 7.16C76.0056 7.16 75.2056 6.84 74.5256 6.2C73.8456 5.52 73.5056 4.72 73.5056 3.8V3.62C73.5056 2.7 73.8456 1.9 74.5256 1.22C75.2056 0.539998 76.0056 0.199999 76.9256 0.199999H102.486C103.406 0.199999 104.206 0.539998 104.886 1.22C105.566 1.9 105.906 2.7 105.906 3.62V3.8C105.906 4.72 105.566 5.52 104.886 6.2C104.206 6.84 103.406 7.16 102.486 7.16H94.4456C94.1256 7.16 93.9656 7.34 93.9656 7.7V40.58C93.9656 41.5 93.6256 42.3 92.9456 42.98C92.2656 43.66 91.4656 44 90.5456 44H88.8656C87.9456 44 87.1456 43.66 86.4656 42.98C85.7856 42.3 85.4456 41.5 85.4456 40.58V7.7C85.4456 7.34 85.2856 7.16 84.9656 7.16H76.9256ZM118.532 44C117.612 44 116.812 43.66 116.132 42.98C115.452 42.3 115.112 41.5 115.112 40.58V3.62C115.112 2.7 115.452 1.9 116.132 1.22C116.812 0.539998 117.612 0.199999 118.532 0.199999H120.932C121.852 0.199999 122.652 0.539998 123.332 1.22C124.012 1.9 124.352 2.7 124.352 3.62V40.58C124.352 41.5 124.012 42.3 123.332 42.98C122.652 43.66 121.852 44 120.932 44H118.532ZM144.666 40.76L132.246 3.44C131.966 2.64 132.066 1.9 132.546 1.22C133.026 0.539998 133.686 0.199999 134.526 0.199999H136.686C137.686 0.199999 138.606 0.519998 139.446 1.16C140.286 1.76 140.826 2.54 141.066 3.5L150.246 35.72C150.246 35.76 150.266 35.78 150.306 35.78C150.346 35.78 150.366 35.76 150.366 35.72L159.666 3.44C159.946 2.48 160.486 1.7 161.286 1.1C162.126 0.499999 163.046 0.199999 164.046 0.199999H165.966C166.806 0.199999 167.466 0.539998 167.946 1.22C168.426 1.9 168.526 2.64 168.246 3.44L155.826 40.76C155.506 41.72 154.926 42.5 154.086 43.1C153.286 43.7 152.366 44 151.326 44H149.166C148.166 44 147.246 43.7 146.406 43.1C145.606 42.5 145.026 41.72 144.666 40.76ZM177.625 44C176.705 44 175.905 43.66 175.225 42.98C174.545 42.3 174.205 41.5 174.205 40.58V3.62C174.205 2.7 174.545 1.9 175.225 1.22C175.905 0.539998 176.705 0.199999 177.625 0.199999H198.025C198.945 0.199999 199.745 0.539998 200.425 1.22C201.105 1.9 201.445 2.7 201.445 3.62C201.445 4.54 201.105 5.34 200.425 6.02C199.745 6.66 198.945 6.98 198.025 6.98H183.145C182.785 6.98 182.605 7.16 182.605 7.52V17.18C182.605 17.54 182.785 17.72 183.145 17.72H197.005C197.925 17.72 198.685 18.04 199.285 18.68C199.925 19.32 200.245 20.08 200.245 20.96C200.245 21.84 199.925 22.6 199.285 23.24C198.685 23.84 197.925 24.14 197.005 24.14H183.145C182.785 24.14 182.605 24.32 182.605 24.68V36.68C182.605 37.04 182.785 37.22 183.145 37.22H198.025C198.945 37.22 199.745 37.56 200.425 38.24C201.105 38.88 201.445 39.66 201.445 40.58C201.445 41.5 201.105 42.3 200.425 42.98C199.745 43.66 198.945 44 198.025 44H177.625Z',
  ];
  val = new Animated.Value(0);
  interpolator = interpolate(
    this.svg[0],
    this.svg[1],
    // this.svg[2],
    // this.svg[3],
    // this.svg[4],
    // this.svg[5],
    // this.svg[6],
  );

  animatingWave = () => {
    tween({
      ease: easing.easeInOut,
      flip: Infinity,
      from: {i: 0},
      to: {i: 1},
      duration: 2000,
    })
      .pipe(({i}) => ({path: this.interpolator(i)}))
      .start(({path}) => {
        this.setState({
          path,
        });
      });

    tween({
      from: [-1, '#465', '0deg'],
      to: [1, '#658', '180deg'],
      ease: easing.linear,
      duration: 500,
    }).start((i) => {
      var scVal = i[0];
      // console.log(i[2])
      // this.setState({i: i});
      this.sc.setValue(scVal);
      this.setState({
        bac: i[1],
        rot: i[2],
      });
    });
  };

  getPath = () => {
    const left = shape
      .line()
      .x((d) => d.x)
      .y((d) => d.y)([
      {x: 0, y: 0},
      {x: 10, y: 0},
    ]);
    const tab = shape
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(shape.curveBasis)([
      {x: width, y: 0},
      {x: width + 5, y: 0},
      {x: width + 10, y: 10},
      {x: width + 15, y: height * 0.8},
      {x: width + this.tabWidth - 15, y: height * 0.8},
      {x: width + this.tabWidth - 10, y: 10},
      {x: width + this.tabWidth - 5, y: 0},
      {x: width + this.tabWidth, y: 0},
    ]);
    const right = shape
      .line()
      .x((d) => d.x)
      .y((d) => d.y)([
      {x: width + this.tabWidth, y: 0},
      {x: width * 2, y: 0},
      {x: width * 2, y: height},
      {x: 0, y: height},
      {x: 0, y: 0},
    ]);
    console.log(`${left} ${tab} ${right}`);
    return `${left} ${tab} ${right}`;
  };
  d = this.getPath();

  componentDidMount = () => {
    this.animatingWave();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#0099ff" />
        <Svg
          width={width}
          height="600"
          style={{position: 'absolute', opacity: 0.5, zIndex: -1}}>
          <Path fill="#0099ff" fillOpacity={1} d={this.state.path} />
        </Svg>

        <View
          style={{
            alignItems: 'center',
            marginLeft: 30,
            zIndex: 2,
          }}>
          <AnimatedSVGPath
            strokeColor={'black'}
            duration={20000}
            strokeWidth="5"
            width="180"
            height="46"
            viewBox="0 0 180 46"
            scale={1}
            delay={100}
            fill="orange"
            d={this.svgText[0]}
            loop={false}
          />
          <AnimatedSVGPath
            strokeColor={'black'}
            strokeWidth="5"
            duration={20000}
            width="202"
            height="44"
            viewBox="0 0 202 44"
            fill="orange"
            scale={1.1}
            delay={100}
            d={this.svgText[1]}
            loop={false}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            marginTop: 20,
            fontSize: 23,
          }}>
          Welcome to WaveyPro
        </Text>
        {/* <Svg
          width={width}
          height="300"
          viewBox="0 0 55 12"
          style={{position: 'absolute', opacity: 0.5}}>
          <Path fill="#0099ff" fillOpacity={1} d={this.svg[0]} />
        </Svg> */}
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: this.state.bac,
            alignSelf: 'center',
            marginTop: 300,
            transform: [{scale: this.sc}],
          }}
        />
        <Svg
          height="35"
          viewBox="0 0 512 512"
          width="35"
          style={{
            transform: [
              {rotate: this.state.rot},
              {scale: Math.abs(this.sc._value)},
            ],
          }}>
          {this.sc._value < 0 ? (
            <G>
              <Path
                fill="#000"
                d="m464.883 64.267h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"
              />
              <Path
                fill="#000"
                d="m464.883 208.867h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"
              />
              <Path
                fill="#000"
                d="m464.883 353.467h-417.766c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"
              />
            </G>
          ) : (
            <Path
              fill="#000"
              d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136    c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002    v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864    c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872    l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
            />
          )}
        </Svg>
        <Svg
          width={width * 2}
          {...{height}}
          style={{
            transform: [{translateX: -width}],
            marginTop: 'auto',
            bottom: 0,
            position: 'absolute',
          }}>
          <Path fill={this.backgroundColor} d={this.d} />
        </Svg>
      </View>
    );
  }
}

export default SVGAnimation;
