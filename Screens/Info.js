import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon } from '@rneui/themed';
import React from 'react';

const backgroundImage = { uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg" }

const Info = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>
                        <Text style={styles.textTitle}>
                            Information Page
                        </Text>
                        {'\n'}
                        {'\n'}
                        Munchlacks is here to help you make recipes with the food you have at home!
                        {'\n'}
                        {'\n'}
                        Here is a quick description of how Munchlacks works.
                        {'\n'}
                        {'\n'}
                        1. Go to the pantry from the homes page and add ingredients to your pantry.
                        {'\n'}
                        {'\n'}
                        2. After adding your ingredients, head back over to the home page and select the "Generate Recipes"
                        button. Select the settings of your choosing to generate recipes that best fit your cravings.
                        {'\n'}
                        {'\n'}
                        3. You can now choose the recipe of your desire.
                        {'\n'}
                        {'\n'}
                        4. Let's get cooking!
                    </Text>
                </View>

                <View style={styles.icon}>
                    <Icon
                        accessibilityRole="button"
                        accessible={true}
                        accessibilityLabel="Navigates to the home screen"
                        raised
                        name='home'
                        type='font-awesome'
                        color="#1E6738"
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>

            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    body: {
        textAlign: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
    },
    bodyText: {
        fontSize: 20,
        color: "black"
    },
    textTitle: {
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical: 'center',
        textDecorationLine: 'underline',
        fontSize: 25,
        fontWeight: 'bold',
    },
    icon: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        paddingRight: 30,
        bottom: 40,
    },

});

export default Info;