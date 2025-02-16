import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
    iconName,
    placeholder,
    secureTextEntry = false,
    value,
    onChangeText,
    onBlur,
    error,
    touched,
}) => {
    return (
        <View>
            <View style={styles.inputContainer}>
                <Ionicons name={iconName} size={20} color="white" />
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                />
            </View>
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 15,
    },
});

export default CustomInput;
