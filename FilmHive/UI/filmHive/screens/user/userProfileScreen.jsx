import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthProvider from '../../services/authProvider';

export default function UserProfileScreen({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.goBackIconContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIcon}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <Image
                style={styles.thumbnail}
                source={AuthProvider.thumbnail ? { uri: AuthProvider.thumbnail } : require('../../assets/noThumbnail.png')}
            />
            <View style={styles.profileImageContainer}>
                <Image
                    style={styles.image}
                    source={AuthProvider.profilePicture ? { uri: AuthProvider.profilePicture } : require('../../assets/defaultUser.png')}
                />
                <TouchableOpacity style={styles.editIconContainer} onPress={() => navigation.navigate('UserProfileEdit')}>
                    <Ionicons name="create-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1D36',
    },
    goBackIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackIconContainer: {
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
    thumbnail: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },

    profileImageContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: -60,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 60,
        marginRight: 15,
    },
    editIconContainer: {
        position: 'absolute',
        top: 5,
        right: 40,
        backgroundColor: '#1F1D36',
        borderRadius: 15,
        padding: 4,
    },
});