import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import FadeIn from 'react-native-fade-in-image';
import Touchable from 'react-native-platform-touchable';

import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

@withNavigation
export default class BreakCard extends React.PureComponent {
  render() {
    const { details } = this.props;
    const containerStyles = [styles.container];

    return (
      <View style={containerStyles}>
        <Touchable
          foreground={Touchable.Ripple('#dadada', true)}
          fallback={TouchableWithoutFeedback}
          onPress={this._handlePressCard}>
          {
            details.type === 'artist' ?
            <View>
              <FadeIn
                placeholderStyle={{ backgroundColor: Colors.purple }}
                style={StyleSheet.absoluteFill}>
                <Image
                  source={details.type === 'artist' ? Images[details.artistRef] : Images.pearl}
                  style={[styles.background, { width: null, height: null }]}
                />
              </FadeIn>
              <View style={styles.cardContentContainer}>
                <View style={styles.contentContainer}>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.headingArtist}>
                  {details.title}
                </Text>
                <View>
                  <Text style={styles.duration}>
                    {details.artists}
                  </Text>
                </View>
              </View>
            </View>
              :
              <View>
                <FadeIn
                  placeholderStyle={{ backgroundColor: Colors.purple }}
                  style={StyleSheet.absoluteFill}>
                  <Image
                    source={details.type === 'artist' ? Images[details.artistRef] : Images.mother}
                    style={[styles.background, { width: null, height: null }]}
                  />
                </FadeIn>
                <View style={styles.cardContentContainer}>
                  <View style={styles.contentContainer}>
                    <View style={styles.content}>
                      <Text style={styles.heading}>
                        {details.title}
                      </Text>
                      <Text style={styles.duration}>
                        {details.artists}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
          }
        </Touchable>
      </View>
    );
  }

  _handlePressCard = () => {
    this.props.navigation.navigate('BreakDetail', {
      details: this.props.details,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.baseMargin,
    marginHorizontal: Layout.doubleBaseMargin,
    borderRadius: 5,
  },
  footer:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    top:20,
    marginBottom:20,
    paddingHorizontal: Layout.doubleBaseMargin,
    borderBottomLeftRadius: Layout.cardRadius,
    borderBottomRightRadius: Layout.cardRadius,
    backgroundColor: Colors.silver,
  },
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
  },
  heading: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 18,
    letterSpacing: -0.2,
    lineHeight: 27,
    backgroundColor:'#FFFB4B',
    color: 'black',
  },
  headingArtist: {
    fontFamily: Fonts.type.semiBold,
    fontSize: 18,
    letterSpacing: -0.2,
    lineHeight: 27,
    color: 'black',
  },
  duration: {
    marginTop:8,
    alignSelf:'center',
    fontFamily: Fonts.type.semiBold,
    fontSize: 16,
    letterSpacing: -0.19,
    backgroundColor:'#fffea3',
    color: 'black',
  },
});
