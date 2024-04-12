import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const NoNetwork = () => {
    const { width, height } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <LottieView
                style={{ width: width * 0.8, height: height * 0.3 }}
                source={require('../assets/animations/no-network.json')}
                autoPlay
                loop
            />
            <Text style={styles.text}>
                Please check your network connection...
            </Text>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A232E',
        padding: 20,
    },
    text: {
        color: '#F70D1A',
        fontSize: 20,
        marginTop: 20,
        width: '80%',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#F70D1A',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
});



export default NoNetwork;
