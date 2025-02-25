import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import UserService from '../services/userService';
import AuthProvider from '../services/authProvider';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/reusableInput';

export default function LoginScreen() {
    const navigation = useNavigation();

    const validationSchema = yup.object().shape({
        username: yup.string().required('Please enter username.'),
        password: yup.string().required('Please enter password.'),
    });

    const login = async (values) => {
        const userService = new UserService();
        try {
            const { username, password } = values;
            AuthProvider.username = username;
            AuthProvider.password = password;
            const user = await userService.login(AuthProvider.username, AuthProvider.password);
            if (user.isDeleted == true || user.isActive == false) {
                alert("Your account is suspended.")
            }
            else {
                AuthProvider.userId = user.userId;
                AuthProvider.username = user.username;
                AuthProvider.firstName = user.firstName;
                AuthProvider.lastName = user.lastName;
                AuthProvider.email = user.email;
                AuthProvider.phone = user.phone;
                AuthProvider.biography = user.biography;
                AuthProvider.profilePicture = user.profilePicture;
                AuthProvider.profileThumbnail = user.profileThumbnail;
                AuthProvider.isDeleted = user.isDeleted;
                AuthProvider.isActive = user.isActive;
                AuthProvider.timeOfDeletion = user.timeOfDeletion;
                AuthProvider.createdAt = user.createdAt;
                AuthProvider.modifiedAt = user.modifiedAt;
                AuthProvider.modifiedBy = user.modifiedBy;
                AuthProvider.roleId = user.roleId;
                navigation.navigate('Home');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <Image source={require('../assets/banner.png')} style={styles.banner}></Image>
                <View style={styles.container}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{ username: '', password: '' }}
                        onSubmit={login}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={{ width: '70%' }}>
                                <Text style={styles.loginText}>Login</Text>
                                <Text style={styles.loginTextBeneath}>Please sign in to continue.</Text>

                                <CustomInput
                                    iconName="person-circle-outline"
                                    placeholder="Username"
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    error={errors.username}
                                    touched={touched.username}
                                />

                                <CustomInput
                                    iconName="lock-closed-outline"
                                    placeholder="Password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    error={errors.password}
                                    touched={touched.password}
                                    secureTextEntry={true}
                                />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                        <Text style={styles.buttonText}>Login</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.signUpText}>
                                        Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View >
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingVertical: 20,
    },
    loginText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    loginTextBeneath: {
        color: 'white',
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#1F1D36',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#E9A6A6',
        paddingVertical: 10,
        borderRadius: 12,
    },
    buttonText: {
        color: '#1F1D36',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        resizeMode: 'cover',
    },
    signUpText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    signUpLink: {
        color: '#E9A6A6',
        fontWeight: 'bold',
    },
});
