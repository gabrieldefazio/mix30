import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { TabViewAnimated, TabViewPagerScroll } from 'react-native-tab-view';

import installations from '../data/installations.json';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PurpleGradient from '../components/PurpleGradient';
import DayToggle from '../components/DayToggle';
import TalkCard from '../components/TalkCard';
import BreakCard from '../components/BreakCard';
import NavigationEvents from '../utilities/NavigationEvents';

export default class InstallationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Installations',
  };
  
  state = {
    index: 0,
    routes: [{ key: 'thursday', day: 0 }, { key: 'friday', day: 1 }, { key: 'saturday', day: 2 }, { key: 'sunday', day: 3 }],
  };
  
  _installationsDayRef = {};
  
  componentWillMount() {
    this._tabPressedListener = NavigationEvents.addListener(
      'selectedTabPressed',
      route => {
        if (route.key === 'Installations') {
          this._scrollToTop();
        }
      }
    );
  }
  
  componentWillUnmount() {
    this._tabPressedListener.remove();
  }
  
  _scrollToTop = () => {
    let installationsDay = this._installationsDayRef[this.state.index];
    installationsDay && installationsDay.scrollToTop();
  };
  
  render() {
    return (
      <PurpleGradient style={styles.container}>
        <TabViewAnimated
          style={{ flex: 1 }}
          lazy={true}
          renderPager={props => <TabViewPagerScroll {...props} />}
          navigationState={this.state}
          renderScene={this._renderPage}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
          initialLayout={{
            width: Layout.window.width,
            height:
            Layout.window.height -
            Layout.tabBarHeight -
            Layout.dayToggleHeight,
          }}
        />
      </PurpleGradient>
    );
  }
  
  _handlePressTab = index => {
    // Scroll to the top if you double tap it
    if (this.state.index === index) {
      this._scrollToTop();
      return;
    }
    
    this._handleChangeTab(index);
  };
  
  _handleChangeTab = index => {
    if (Platform.OS === 'ios') {
      this.setState({ index });
    }
    
    // note(brentvatne): ViewPager is broken (https://github.com/facebook/react-native/issues/14296),
    // so we need to use TabViewPagerScroll, which uses ScrollView and has a small bug on Android
    // this is a workaround
    if (this._tabChangeTimer) {
      return;
    }
    
    this.setState({ index });
    this._tabChangeTimer = setTimeout(() => {
      this._tabChangeTimer = null;
    }, 300);
  };
  
  _renderHeader = props => {
    return (
      <View />
    );
  };
  
  _renderPage = ({ route }) => {
    const { day } = route;
    
    return (
      <Installation
        ref={view => {
          this._installationsDayRef[day] = view;
        }}
        events={installations[day]}
        fadeInOnRender={day === 1}
      />
    );
  };
}

class Installation extends React.PureComponent {
  constructor(props) {
    super();
    
    this.state = {
      visible: new Animated.Value(props.fadeInOnRender ? 0 : 1),
      waitingToRender: !!props.fadeInOnRender,
    };
  }
  
  componentWillMount() {
    if (this.props.fadeInOnRender) {
      requestAnimationFrame(() => {
        this.setState({ waitingToRender: false }, () => {
          Animated.timing(this.state.visible, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
      });
    }
  }
  
  render() {
    if (this.state.waitingToRender) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
    
    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: this.state.visible,
          backgroundColor: 'transparent',
        }}>
        <FlatList
          data={this.props.events}
          ref={view => {
            this._list = view;
          }}
          renderItem={this._renderItem}
          keyExtractor={item => item.eventStart}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    );
  }
  
  scrollToTop = () => {
    this._list.scrollToOffset({ x: 0, y: 0 });
  };
  
  _renderItem = ({ item }) => <BreakCard details={item} />;
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: Layout.window.width,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.snow,
    marginVertical: Layout.smallMargin,
  },
  boldLabel: {
    fontWeight: 'bold',
    color: Colors.text,
  },
  label: {
    color: Colors.text,
  },
  listContent: {
    paddingTop: Layout.baseMargin,
    paddingBottom: 20,
  },
  timeline: {
    width: 2,
    backgroundColor: '#6E3C7B',
    position: 'absolute',
    top: 85,
    bottom: 0,
    right: 11,
  },
});
