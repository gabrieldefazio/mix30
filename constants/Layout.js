import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

// note(brentvatne): not sure what this is for?
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const isSmallDevice = screenHeight <= 568;

export default {
  window: {
    width,
    height,
  },
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth,
  screenHeight,
  isSmallDevice,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  tabBarHeight: 54,
  dayToggleHeight: 65,
  buttonRadius: 4,
  cardRadius: 5,
  locationBackgroundHeight: screenHeight * 0.485757121,
  breakHeight: 125,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
    avatar: 54,
  },
};
