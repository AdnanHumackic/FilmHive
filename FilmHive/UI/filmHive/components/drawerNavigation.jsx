import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/homeScreen";
import FilmListScreen from "../screens/film/filmListScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "#4A4A6A",
        drawerActiveBackgroundColor: "#E9A6A6",
        drawerLabelStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          width: 270,
          backgroundColor: "#1F1D36",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="Films"
        component={FilmListScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
          title: "Films",
        }}
      />
      <Drawer.Screen
        name="Reviews"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          title: "Reviews",
        }}
      />
      <Drawer.Screen
        name="Watchlist"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="watch-outline" size={size} color={color} />
          ),
          title: "Watchlist",
        }}
      />
      <Drawer.Screen
        name="Lists"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
          title: "Lists",
        }}
      />
      <Drawer.Screen
        name="Sign out"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
          title: "Sign out",
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
