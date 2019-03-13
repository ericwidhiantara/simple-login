import React, { Component } from 'react';
import { YellowBox } from "react-native";
//import { Font } from "expo";
import Groups from "./src/screens/Groups";
import Profile from "./src/screens/Profile";
import { StackNavigator, DrawerNavigator } from "react-navigation";
const DrawerNavigation = DrawerNavigator({
  Groups: {
    screen: Groups
  },
  Profile: {
    screen: Profile
  }
});
const StackNavigation = StackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation
    },
    Groups: {
      screen: Groups
    },
    Profile: {
      screen: Profile
    }
  },
  {
    headerMode: "none"
  }
);
export default class MainApp extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: true
    };
    YellowBox.ignoreWarnings([
      "Warning: isMounted is deprecated",
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);
  }
  
  render() {
    return (
      <StackNavigation />
    );
  }
}
