import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { format } from 'date-fns';

import { Colors, Fonts, Layout } from '../constants';
import RemindMeButton from './RemindMeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

@withNavigation
export default class TalkFooter extends React.PureComponent {
  render() {
    const { details } = this.props;
    const formattedStart = format(details.eventStart, 'h:mmA');
    
    const renderIcon = () => {
      const { notificationId } = this.props;
      let iconColor = Colors.red;
      let iconName =
        Platform.OS === 'ios'
          ? 'ios-film-outline'
          : 'md-film';
      
      return (
        <Ionicons
      name={iconName}
      size={15}
      style={[{ color: iconColor }, styles.icon]}
      />
    );
    }
    
    return (
      <View style={styles.container}>
  <View style={styles.details}>
    {
      details.price ?
        <View style={styles.detailPrice}>
          <Text style={styles.detailPriceText}>
            {details.price}
          </Text>
        </View>
        :
      <View style={styles.detail}>
        <Text style={styles.detailLabel}>Starts at:</Text>
        <Text style={styles.detailText}>
          {formattedStart}
        </Text>
      </View>
    }
 
    </View>
    {!details.price && this._maybeRenderRemindMeButton()}
  <TouchableOpacity
    activeOpacity={0.7}
    hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
    style={[styles.button]}
    onPress={
      ()=>{ Linking.openURL(details.purchaseUrl)}
    }>
  <View style={styles.buttonContainer}>
    {renderIcon()}
  <Text style={[styles.text, styles.activeText]}>
    Buy Tickets
    </Text>
    </View>
    </TouchableOpacity>
    </View>
  );
  }
  
  _maybeRenderRemindMeButton = () => {
    let { details } = this.props;
    
    return (
      <View style={styles.remindMe}>
  <RemindMeButton time={details.eventStart} title={details.title} />
    </View>
  );
  };
}

_handleBuyPress = () => {
  console.log('pressed')
  this.props.navigation.navigate('PayDetail', {
    details: this.props.details,
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: Layout.doubleBaseMargin,
    borderBottomLeftRadius: Layout.cardRadius,
    borderBottomRightRadius: Layout.cardRadius,
    backgroundColor: '#fff',
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 34 / 2,
    backgroundColor: Colors.clear,
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.isSmallDevice ? 30 : 34,
    marginLeft: Layout.isSmallDevice ? 20 : 0,
    marginRight: Layout.isSmallDevice ? -5 : 0,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
  },
  detail: {
    paddingRight: Layout.doubleBaseMargin,
  },
  detailPrice: {
    top: 5,
    paddingRight: Layout.doubleBaseMargin,
  },
  icon: {
    marginRight: 8,
  },
  detailLabel: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
    color: Colors.lightText,
    letterSpacing: 0,
  },
  text: {
    fontFamily: Fonts.type.medium,
    fontSize: Layout.isSmallDevice ? 9 : 11,
    color: Colors.red,
  },
  detailText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: Colors.darkPurple,
    letterSpacing: 0,
  },
  detailPriceText: {
  fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: Colors.darkPurple,
    letterSpacing: 0,
},
  remindMe: {
    flex: 1,
    alignItems: 'stretch',
    marginRight:10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginRight: 10
  },
  socialButtons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
