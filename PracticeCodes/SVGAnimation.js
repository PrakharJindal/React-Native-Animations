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

const {width} = Dimensions.get('window');
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
  val = new Animated.Value(0);
  interpolator = interpolate(
    this.svg[0],
    this.svg[1],
    this.svg[2],
    this.svg[3],
    this.svg[4],
    this.svg[5],
    this.svg[6],
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
          width="100%"
          height="400"
          style={{position: 'absolute', opacity: 0.5}}>
          <Path fill="#0099ff" fillOpacity={1} d={this.state.path} />
        </Svg>
        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            marginTop: 20,
            fontSize: 23,
          }}>
          Welcome to WaveyPro
        </Text>
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
