import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from '../screens/home';
import mobx from '../screens/mobx';
import mobxStateTree from '../screens/mobxStateTree';
const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="home" component={home} />
      <Stack.Screen name="mobx" component={mobx} />
      <Stack.Screen name="mobxStateTree" component={mobxStateTree} />
    </Stack.Navigator>
  );
};
export default function NaviStack() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}
