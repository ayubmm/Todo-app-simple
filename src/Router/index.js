import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Settings, Task } from '../Page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ButtomNavigation } from '../Component';

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Bottom.Navigator tabBar={(props) => <ButtomNavigation {...props} />}>
      <Bottom.Screen name="Task" component={Task} options={{ headerShown: false }} />
      <Bottom.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Bottom.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Bottom.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default Router;
