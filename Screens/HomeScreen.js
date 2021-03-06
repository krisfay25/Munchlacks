import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, ImageBackground } from 'react-native';
import { Icon } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.AppDB');
const backgroundImage = { uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg" };

const createTable = () => {

    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Pantry"
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL UNIQUE);"
        )
    });

}

const HomeScreen = ({ navigation }) => {

    createTable();

    return (
        <View style={styles.container}>

            <ImageBackground source={backgroundImage} style={styles.container}>

                <Text
                    style={styles.title}
                    accessibilityRole="text"
                    accessible={true}
                    accessibilityLabel="This is the title of the application. Munchlacks">
                    Munchlacks
                </Text>

                    <Image source={require('../Images/munchlax-pokemon.png')}
                        style={styles.image}
                        accessibilityRole="image"
                        accessible={true}
                        accessibilityLabel="The pokemon munchlax eating food gif. This the logo of the application."
                    />

                <View style={styles.bottomView}>
                    <View style={styles.button1}>
                        <Button
                            accessibilityRole="button"
                            accessible={true}
                            accessibilityLabel="Navigates to the pantry screen"
                            color="#1E6738"
                            title="Pantry"
                            onPress={() => navigation.navigate('Pantry', db)}
                        />
                    </View>

                    <View style={styles.button2}>
                        <Button
                            accessibilityRole="button"
                            accessible={true}
                            accessibilityLabel="Navigates to the generate recipes screen"
                            color="#1E6738"
                            title="Generate Recipes"
                            onPress={() => {
                                navigation.navigate('RecipePage', db);
                            }}
                        />
                    </View>
                </View>

                <View style={styles.icon}>
                    <Icon
                        accessibilityRole="button"
                        accessible={true}
                        accessibilityLabel="Navigates to the information screen"
                        raised
                        name='info-circle'
                        type='font-awesome'
                        color="#1E6738"
                        onPress={() => navigation.navigate('Info')}
                    />
                </View>

                <StatusBar style="auto" />

            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    button1: {
        paddingBottom: 10,
        width: '50%',
        borderRadius: 10
    },
    button2: {
        marginTop: 10,
        width: '50%',
    },
    title: {
        fontSize: 50,
        color: '#335145',
        fontWeight: 'bold',
        top: '8%',
        fontFamily: 'serif',
    },
    image: {
        top: '20%',
        width: 200,
        height: 200,
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 200,
    },
    icon: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        paddingRight: 30,
        bottom: 40,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    frameStyle: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
        height: '45%',
        right: 1,
        left: 10,
        top: 90
    }
});

export default HomeScreen;