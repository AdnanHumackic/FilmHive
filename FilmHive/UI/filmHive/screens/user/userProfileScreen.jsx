import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function UserProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>User Profile</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1D36',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 80,
        marginLeft: 25,
    },
});