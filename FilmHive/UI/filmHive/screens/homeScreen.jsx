import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AuthProvider from '../services/authProvider';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.menuIconContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
                        <Ionicons
                            name="menu-outline"
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Hello, <Text style={styles.username}>{AuthProvider.username}</Text></Text>
                <Text style={styles.greetingText}>Review or track film you’ve watched...</Text>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 20,
    },
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
    username: {
        color: '#E9A6A6',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    greetingText: {
        color: 'white',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 25,
        marginBottom: 10,
    },
    menuIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIconContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        borderRadius: 30,
        backgroundColor: '#E9A6A6',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
