import React, { useState } from 'react'
import { Image, TouchableOpacity, Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import CustomInput from '../services/reusableInput';
import UserService from '../services/userService';

export default function SignUpScreen({ navigation }) {

    const validationSchema = yup.object().shape({
        username: yup.string()
            .min(3, 'Username must be at least 3 characters long.')
            .max(20, 'Username can not be over 20 characters long.')
            .required('Please enter username.'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters long.')
            .required('Please enter password.'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password.'),
        email: yup.string().email('Please enter a valid email.').required('Please enter email.'),
        phone: yup.string()
            .matches(/^\+[0-9]{7,15}$/, 'Phone number must start with + and have 7 to 15 digits.')
            .required('Please enter a valid phone number.'),
        firstName: yup.string()
            .matches(/^[A-Z][a-zA-Z]*$/, 'First name must start with a capital letter.')
            .required('Please enter first name.'),
        lastName: yup.string()
            .matches(/^[A-Z][a-zA-Z]*$/, 'Last name must start with a capital letter.')
            .required('Please enter last name.'),
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={require('../assets/banner.png')} style={styles.banner}></Image>
                <Text style={styles.text}>Sign Up</Text>
                <Text style={styles.message}>Create an account to continue.</Text>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        passwordConfirmation: '',
                        email: '',
                        phone: '',
                        firstName: '',
                        lastName: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const userService = new UserService();
                        try {
                            const user = await userService.addUser({
                                ...values,
                                roleId: 1,
                                isActive: true
                            });
                            alert('Registered successfully.');
                            navigation.navigate('Login');
                        } catch (error) {
                            alert(error.message);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ width: '70%' }}>
                            <CustomInput
                                iconName="person-circle-outline"
                                placeholder="First name"
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                error={errors.firstName}
                                touched={touched.firstName}
                            />
                            <CustomInput
                                iconName="person-circle-outline"
                                placeholder="Last name"
                                value={values.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                error={errors.lastName}
                                touched={touched.lastName}
                            />
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
                                secureTextEntry={true}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={errors.password}
                                touched={touched.password}
                            />
                            <CustomInput
                                iconName="lock-closed-outline"
                                placeholder="Password confirmation"
                                secureTextEntry={true}
                                value={values.passwordConfirmation}
                                onChangeText={handleChange('passwordConfirmation')}
                                onBlur={handleBlur('passwordConfirmation')}
                                error={errors.passwordConfirmation}
                                touched={touched.passwordConfirmation}
                            />
                            <CustomInput
                                iconName="mail-outline"
                                placeholder="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={errors.email}
                                touched={touched.email}
                            />
                            <CustomInput
                                iconName="phone-portrait-outline"
                                placeholder="Phone"
                                value={values.phone}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                error={errors.phone}
                                touched={touched.phone}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginText}>
                                    Already have an account? <Text style={styles.loginLink}>Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#1F1D36',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 70,
    },
    message: {
        color: 'white',
        fontSize: 13,
        marginBottom: 50,
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
    loginText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    loginLink: {
        color: '#E9A6A6',
        fontWeight: 'bold',
    },
    datePickerButton: {
        backgroundColor: '#E9A6A6',
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
    },
    datePickerText: {
        color: '#1F1D36',
        textAlign: 'center',
        fontSize: 16,
    },
});
