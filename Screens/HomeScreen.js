import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useState } from 'react';
import RecipeData from './../test_recipes.json';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.AppDB');

const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Pantry"
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL UNIQUE);"
        )
    });

    /*db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry (Name) values ('Cum')", null,
            (txObj, resultSet) => {},
            (txObj, error) => console.warn('DB error: ',error)
        )
    });*/
}

const HomeScreen = ({ navigation }) => {
    const [isPantry, setIsPantry] = useState();
    createTable();
    
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Munchlacks!
            </Text>

            <Image source={require('../Images/munchlax-pokemon.png')}
                style={styles.image}
            />

            <View style={styles.bottomView}>
                <View style={styles.button1}>
                    <Button
                        title="Pantry"
                        onPress={() => navigation.navigate('Pantry', db)}
                    />
                </View>

                <View style={styles.button2}>
                <Button
                    title="Generate Recipes"
                    onPress={() => {

                        navigation.navigate('RecipePage', db);

                }}
                />
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#58879d',
        alignItems: 'center',
    },
    button1: {
        paddingBottom: 10,
        width: '50%' 
        //paddingVertical: 10,
    },
    button2: {
        //paddingBottom: 10, 
        marginTop: 10,
        width: '50%'
    },
    title: {
        fontSize: 32,
        color: '#ffff',
        fontWeight: 'bold',
        top: '5%',
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
    }
});

export default HomeScreen;