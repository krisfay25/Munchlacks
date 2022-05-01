import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, ImageBackground } from 'react-native';
import { Icon } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.AppDB');
const backgroundImage = {uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg"};

const createTable = () => {

    db.transaction(tx => {
        tx.executeSql(
            "Drop Table Pantry"
        )
    });

    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Pantry"
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL UNIQUE);"
        )
    });

    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Potatoes')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Butter')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Milk')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Salt')"
        )
    });

    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Pepper')"
        )
    });

    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Elbow macaroni')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Butter')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Flour')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Milk')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Cheddar cheese')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Parmesan cheese')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Bread crumbs')"
        )
    });
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry(Name) VALUES ('Paprika')"
        )
    });

}

const HomeScreen = ({ navigation }) => {

    createTable();

    return (
        <View style={styles.container}>

            <ImageBackground source={backgroundImage} style={styles.container}>
            
                <Text style={styles.title}>
                    Munchlacks!
                </Text>

                <Image source={require('../Images/munchlax-pokemon.png')}
                    style={styles.image}
                />

                <View style={styles.bottomView}>
                    <View style={styles.button1}>
                        <Button color="#1E6738"
                            title="Pantry"
                            onPress={() => navigation.navigate('Pantry', db)}
                        />
                    </View>

                    <View style={styles.button2}>
                        <Button color="#1E6738"  borderRadius= '10'
                            title="Generate Recipes"
                            onPress={() => {
                                navigation.navigate('RecipePage', db);
                            }}
                        />
                    </View>
                </View>

                <View style={styles.icon}>
                    <Icon
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
    },
    image: {
        top: '15%',
        width: 200,
        height: 200,
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 270,
    },
    icon: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        paddingRight: 30,
        bottom: 40,
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    }
});

export default HomeScreen;