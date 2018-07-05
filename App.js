import React from 'react';
import {
  Alert,
  StatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';
import { AppLoading, KeepAwake, Notifications } from 'expo';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sentry from 'sentry-expo';

import Images from './constants/Images';
import RootNavigation from './navigation/RootNavigation';
import Colors from './constants/Colors';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import NavigationEvents from './utilities/NavigationEvents';
import Store from './state/Store';

Sentry
  .config('https://b62812ee820e4400a318e602581326b9:673b4a5123834a6891cb8778cca8a7f2@sentry.io/305429')
  .install();


console.disableYellowBox = true;
Text.defaultProps.allowFontScaling = false;

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._initializeAsync();
    this._listenForNotifications();
  }

  _listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(
          'A friendly reminder',
          `"${notification.data.title}" is starting soon!`
        );
      }
    });
  };

  async _initializeAsync() {
    try {
      await Promise.all([
        Store.rehydrateAsync(),
        cacheAssetsAsync({
          images: Images.forLocalCache,
          fonts: [
            Ionicons.font,
            {
              'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            },
            {
              'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
            },
            {
              'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
            },
            {
              'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            },
            {
              'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            },
          ],
        }),
      ]);
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider store={Store}>
          <SafeAreaView style={styles.container}>
            <RootNavigation
              onNavigationStateChange={(prevState, currentState) => {
                NavigationEvents.emit('change', { prevState, currentState });
              }}
            />

            {__DEV__ && <KeepAwake />}
            <StatusBar
              barStyle="light-content"
              backgroundColor={Colors.purple}
            />
          </SafeAreaView>
        </Provider>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9f918c',
  },
});
