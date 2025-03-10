import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import DrawerNavigator from './components/drawerNavigation';
import FilmDetailsScreen from './screens/film/filmDetailsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UserProfileScreen from './screens/user/userProfileScreen';
import UserProfileEditScreen from './screens/user/userProfileEditScreen';
import AddFilmReviewScreen from './screens/filmReview/addFilmReviewScreen';
import FilmReviewDetailsScreen from './screens/filmReview/filmReviewDetailsScreen';
import UpdateFilmReviewScreen from './screens/filmReview/updateFilmReviewScreen';
import AddFilmToListScreen from './screens/list/addFilmToListScreen';

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
          <Stack.Screen
            name="UserProfileEdit"
            component={UserProfileEditScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReviewDetails"
            component={FilmReviewDetailsScreen}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="AddFilmReview"
            component={AddFilmReviewScreen}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="UpdateFilmReview"
            component={UpdateFilmReviewScreen}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="AddFilmToList"
            component={AddFilmToListScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
