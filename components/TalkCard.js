import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet, Linking,
} from 'react-native'
import { withNavigation } from 'react-navigation';
import Touchable from 'react-native-platform-touchable';
import FadeIn from 'react-native-fade-in-image';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import TalkFooter from '../components/TalkFooter';

@withNavigation
export default class TalkCard extends React.PureComponent {
  render() {
    const { details } = this.props;
    const containerStyles = [styles.container];
    
    return (
      <Touchable
    style={styles.touchable}
    background={Touchable.Ripple('#ccc', false)}
    fallback={TouchableWithoutFeedback}
    onPress={ !!details.price ? ()=>{ } : this._handlePressCard}>
  <View style={containerStyles}>
      <FadeIn
    placeholderStyle={{ backgroundColor: Colors.purple }}
    style={StyleSheet.absoluteFill}>
  <Image
    source={Images[details.image]}
    style={[styles.background, { width: null, height: null }]}
    />
    </FadeIn>
    <View style={styles.cardContentContainer}>
  <View style={styles.contentContainer}>
  <View style={styles.content}>
  <Text style={styles.heading}>
    {details.title}
  </Text>
    </View>
    </View>
    </View>
    <TalkFooter details={details} navigation={this.props.navigation} />
    </View>
    </Touchable>
  );
  }
  
  _handlePressCard = () => {
    this.props.navigation.navigate('TalkDetail', {
      details: this.props.details,
    });
  };
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 5,
    ...Platform.select({
      android: {
        marginVertical: Layout.baseMargin,
        marginHorizontal: Layout.doubleBaseMargin,
        backgroundColor: Colors.snow,
      },
    }),
  },
  container: {
    flex: 1,
    marginVertical: Layout.baseMargin,
    // marginHorizontal: Layout.doubleBaseMargin,
    backgroundColor: Colors.snow,
    ...Platform.select({
      ios: {
        borderRadius: 5,
        marginVertical: Layout.baseMargin,
        marginHorizontal: Layout.doubleBaseMargin,
        backgroundColor: Colors.snow
      },
      android: {
        borderRadius: 5,
        marginTop:10,
        marginHorizontal:10,
      }
    }),
  },
  finished: {
    opacity: 0.7,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.doubleBaseMargin,
    borderTopLeftRadius: Layout.cardRadius,
    borderTopRightRadius: Layout.cardRadius,
  },
  infoText: {
    flex: 1,
    paddingRight: Layout.doubleBaseMargin,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: Colors.darkPurple,
    letterSpacing: 0,
  },
  name: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
    color: Colors.lightText,
    letterSpacing: 0,
    lineHeight: 18,
  },
  avatar: {
    width: Layout.images.avatar,
    height: Layout.images.avatar,
    borderColor: Colors.avatarBorder,
    borderWidth: 1,
    borderRadius: Layout.images.avatar / 2,
  },
  moreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: Layout.doubleBaseMargin,
    borderBottomLeftRadius: Layout.cardRadius,
    borderBottomRightRadius: Layout.cardRadius,
    backgroundColor: Colors.silver,
  },
  details: {
    flexDirection: 'row',
  },
  detail: {
    paddingRight: Layout.doubleBaseMargin,
  },
  detailLabel: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    color: Colors.lightText,
    letterSpacing: 0,
  },
  detailText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: Colors.darkPurple,
    letterSpacing: 0,
  },
  // container: {
  //   marginVertical: Layout.baseMargin,
  //   marginHorizontal: Layout.doubleBaseMargin,
  //   borderRadius: 5,
  // },
  cardContentContainer: {
    height: Layout.breakHeight,
  },
  currentDay: {
    marginLeft: 16,
    marginRight: 24,
  },
  active: {
    marginLeft: 6,
    marginRight: 34,
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    shadowColor: Colors.redShadow,
    shadowOpacity: 1,
  },
  background: {
    resizeMode: 'cover',
    borderRadius: 5,
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sponsor: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sponsorText: {
    marginTop: 4,
    fontFamily: Fonts.type.base,
    fontSize: 11,
    letterSpacing: 0,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  },
  content: {
    justifyContent: 'center',
    marginLeft: 15,
    marginBottom:20
  },
  heading: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 27,
    paddingHorizontal:5,
    // backgroundColor: Colors.transparent,
    backgroundColor:'#FFFB4B',
    // opacity: 0.8,
    color: 'black',
    top:40
  },
  duration: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 16,
    letterSpacing: -0.19,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
  }
});
