import React from 'react';
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Constants, LinearGradient } from 'expo';
import Touchable from 'react-native-platform-touchable';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const buttonHitSlop = {
  top: 30,
  left: 30,
  right: 30,
  bottom: 30,
};

export default class DayToggle extends React.Component {
  render() {
    const { position, onPressDay } = this.props;

    const dayOneStyle = {
      color: position.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['rgba(0,0,0,1)', 'rgba(0,0,0,0.60)','rgba(0,0,0,0.60)', 'rgba(0,0,0,0.40)'],
        extrapolate: 'clamp',
      }),
    };

    const dayTwoStyle = {
      color: position.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['rgba(0,0,0,0.60)', 'rgba(0,0,0,1)', 'rgba(0,0,0,0.60)', 'rgba(0,0,0,0.60)'],
        extrapolate: 'clamp',
      }),
    };
  
    const dayThreeStyle = {
      color: position.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['rgba(0,0,0,0.40)','rgba(0,0,0,0.60)','rgba(0,0,0,1)', 'rgba(0,0,0,0.60)'],
        extrapolate: 'clamp',
      }),
    };
    
    const dayFourStyle = {
      color: position.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['rgba(0,0,0,0.40)','rgba(0,0,0,0.60)', 'rgba(0,0,0,0.60)', 'rgba(0,0,0,1)'],
        extrapolate: 'clamp',
      }),
    };

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 0.38, 1.0]}
        colors={['#fffd38', '#fffd38', '#fffd38']}
        style={styles.headerGradient}>
        <View style={styles.dayToggle}>
          <Touchable
            fallback={TouchableOpacity}
            style={styles.dayToggleButton}
            background={Touchable.Ripple(Colors.purpleRipple, false)}
            onPress={() => onPressDay(0)}
            hitSlop={buttonHitSlop}>
            <Animated.Text style={[styles.dayText, dayOneStyle]}>
              Thursday
            </Animated.Text>
          </Touchable>
          <Touchable
            style={styles.dayToggleButton}
            fallback={TouchableOpacity}
            background={Touchable.Ripple(Colors.purpleRipple, false)}
            onPress={() => onPressDay(1)}
            hitSlop={buttonHitSlop}>
            <Animated.Text style={[styles.dayText, dayTwoStyle]}>
              Friday
            </Animated.Text>
          </Touchable>
          <Touchable
            fallback={TouchableOpacity}
            style={styles.dayToggleButton}
            background={Touchable.Ripple(Colors.purpleRipple, false)}
            onPress={() => onPressDay(2)}
            hitSlop={buttonHitSlop}>
            <Animated.Text style={[styles.dayText, dayThreeStyle]}>
              Saturday
            </Animated.Text>
          </Touchable>
          <Touchable
            style={styles.dayToggleButton}
            fallback={TouchableOpacity}
            background={Touchable.Ripple(Colors.purpleRipple, false)}
            onPress={() => onPressDay(3)}
            hitSlop={buttonHitSlop}>
            <Animated.Text style={[styles.dayText, dayFourStyle]}>
              Sunday
            </Animated.Text>
          </Touchable>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  headerGradient: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 20,
    zIndex: 0,
    backgroundColor: 'black',
  },
  dayToggle: {
    flexDirection: 'row',
    height: Layout.dayToggleHeight,
    width: Layout.window.width,
    backgroundColor: Colors.clear,
    left: 5
  },
  dayToggleButton: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    backgroundColor: Colors.clear,
    fontFamily: 'Montserrat-Medium',
    fontSize: Layout.isSmallDevice ? 17 : 19,
    letterSpacing: 0,
  },
});
