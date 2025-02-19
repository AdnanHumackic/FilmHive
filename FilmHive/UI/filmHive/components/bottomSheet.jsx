import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Animated, TouchableOpacity } from 'react-native';

const CustomBottomSheet = ({
    isVisible,
    onClose,
    title,
    children,
    animationType = 'none',
    slideHeight = 300
}) => {
    const slideAnim = useRef(new Animated.Value(slideHeight)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: slideHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, slideAnim, slideHeight]);

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType={animationType}
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
                {title && (
                    <>
                        <Text style={styles.sheetTitle}>{title}</Text>
                        <View style={styles.divider} />
                    </>
                )}
                <View style={styles.sheetContent}>
                    {children}
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    divider: {
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.5,
        marginVertical: 10,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1F1D36',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },
    sheetContent: {
        marginTop: 10,
    },
});

export default CustomBottomSheet;
