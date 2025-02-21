import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import DrawerNavigator from './components/drawerNavigation';
import FilmDetailsScreen from './screens/film/filmDetailsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UserProfileScreen from './screens/user/userProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => { }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FilmDetails"
            component={FilmDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
