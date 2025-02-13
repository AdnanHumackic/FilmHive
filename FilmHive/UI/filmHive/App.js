import React from 'react';
import { Image, TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';

export default function App() {

  const validationSchema = yup.object().shape({
    username: yup.string().required('Please enter username.'),
    password: yup.string().required('Please enter password.'),
  });

  const login = (values) => {
    console.log('Form data:', values);
  };

  return (
    <View style={styles.safeArea}>
      <Image source={require('./assets/banner.png')} style={styles.banner}></Image>
      <View style={styles.container}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={login}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={styles.loginText}>Login</Text>
              <Text style={styles.loginTextBeneath}>Please sign in to continue.</Text>
              <View style={[styles.inputContainer, { width: '70%' }]}>
                <Ionicons name="person-circle-outline" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="white"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <View style={[styles.inputContainer, { width: '70%' }]}>
                <Ionicons name="lock-closed-outline" size={20} color="white" />
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="white"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => console.log('navigating to sign up')}>
                <Text style={styles.signUpText}>
                  Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#1F1D36',
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
    backgroundColor: '#1F1D36',
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

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 15,
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
