import React from 'react';
import {
  Animated,
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';

import BackButton from '../components/BackButton';
import SocialMediaButton from '../components/SocialMediaButton';
import TalkFooter from '../components/TalkFooter';
import StatusBarUnderlay from '../components/StatusBarUnderlay';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class TalkDetailScreen extends React.PureComponent {
  state = {
    scrollY: new Animated.Value(0),
  };

  render() {
    const { details } = this.props.navigation.state.params;

    let underlayOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          scrollEventThrottle={1}>
          <View style={styles.container}>
            <BackButton style={styles.backButton} />

            <View style={styles.cardShadow1} />
            <View style={styles.cardShadow2} />
            {this._renderAvatar()}
            <View style={styles.card}>
              <Text style={styles.sectionHeading}>SCREENING</Text>
              <Text style={styles.heading}>
                {details.title}
              </Text>
              <Text style={styles.description}>
                {details.description}
              </Text>
              {
                !!details.filmInfo.length &&
                <View>
                  <Text style={styles.sectionHeading}>{details.filmInfo.length > 1 ? "FILMS" : "FILM" }</Text>
                  {this._renderFilms()}
                </View>
              }
            </View>

            <TalkFooter details={details} />
          </View>
        </Animated.ScrollView>

        <StatusBarUnderlay animatedOpacity={underlayOpacity} />
      </View>
    );
  }

  _renderAvatar() {
    const { details } = this.props.navigation.state.params;

    const image = (
      <Image style={styles.avatar} source={require('../assets/images/pearl.png')} />
    );
    if (Platform.OS === 'ios') {
      return (
        <FadeIn style={styles.avatarFadeContainer}>
          {image}
        </FadeIn>
      );
    } else {
      return image;
    }
  }

  _renderFilms = () => {
    const { details } = this.props.navigation.state.params;
    const { filmInfo } = details;

    return filmInfo.map(this._renderFilm);
  };

  _renderFilm = (film, index) => {
    return (
      <View key={index}>
        <Text style={styles.heading}>
          {film.name}
        </Text>
        <Text style={styles.sectionHeading}>{`by ${film.artist}`}</Text>
        <Text style={styles.description}>
          {film.filmDescription}
        </Text>
        <Text style={styles.sectionHeading}>
          {film.contact}
        </Text>
        <Text style={styles.details}>
          {film.filmDetails}
        </Text>
      </View>
    );
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 101,
    marginBottom: Layout.doubleBaseMargin,
    marginHorizontal: Layout.doubleBaseMargin,
  },
  backButton: {
    position: 'absolute',
    top: -65,
    left: -5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardShadow1: {
    flex: 1,
    height: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.purpleShadow1,
    borderTopLeftRadius: Layout.cardRadius,
    borderTopRightRadius: Layout.cardRadius,
  },
  cardShadow2: {
    flex: 1,
    height: 6,
    marginHorizontal: 5,
    backgroundColor: Colors.purpleShadow2,
    borderTopLeftRadius: Layout.cardRadius,
    borderTopRightRadius: Layout.cardRadius,
  },
  card: {
    
    ...Platform.select({
      flex:1,
      ios: {
        paddingTop: 48,
        paddingHorizontal: 30,
        borderTopLeftRadius: Layout.cardRadius,
        borderTopRightRadius: Layout.cardRadius,
        backgroundColor: '#fff',
      },
      android: {
        paddingTop: 48,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        zIndex: 3,
      }
    })
  },
  avatarFadeContainer: {
    zIndex: 4,
  },
  avatar: {
    position: 'absolute',
    zIndex: 4,
    top: -43,
    left: (Layout.screenWidth - Layout.doubleBaseMargin * 2) / 2 - 53,
    height: 106,
    width: 106,
    borderRadius: 53,
    borderColor: Colors.snow,
    borderWidth: 1,
  },
  sectionHeading: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.lightText,
  },
  heading: {
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    letterSpacing: 0,
    color: Colors.darkPurple,
  },
  description: {
    marginBottom: 9,
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
    color: Colors.lightText,
  },
  details: {
    marginBottom: 30,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
    color: Colors.lightText,
  },
  social: {
    flexDirection: 'row',
    marginBottom: 30,
  },
});
