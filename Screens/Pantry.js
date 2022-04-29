import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from '@rneui/base';
import { useState } from 'react';
import { Card } from '@rneui/themed';

const Pantry = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isPantry, setIsPantry] = useState(false);
    const [pantry, setPantry] = useState([]);
    let db = route.params;

    // checks the database whether there is an existing pantry
    db.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(*) AS num FROM Pantry", null,
            (txObj, resultSet) => {
                if (resultSet.rows._array[0]["num"] == 0) {
                    setIsPantry(false);
                    setLoading(false);
                }
                else {

                    db.transaction(tx => {
                        tx.executeSql(
                            "SELECT * FROM Pantry", null,
                            (txObj, resultSet) => {
                                resultSet.rows._array.forEach(x => {
                                    if (pantry.length < resultSet.rows._array.length) {
                                        pantry.push(x);
                                    }

                                });
                                setIsPantry(true);
                                setLoading(false);
                            },
                            (txObj, error) => console.warn('DB error: ', error)
                        )
                    });


                }
            },
            (txObj, error) => console.warn('DB error: ', error)
        )
    });

    return (
        <View style={styles.container}>
            {loading ? <Text>Loading...</Text> :
                isPantry ?
                    <View>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title>Pantry</Card.Title>
                            <Card.Divider />
                            {
                                pantry.map(x => {
                                    return (
                                        <Text>{x.Name}</Text>
                                    );
                                })
                            }
                        </Card>

                        <View style={styles.buttonContainer}>
                            <View style = {styles.button}>
                            <Button
                            title="Add Ingredient"/>
                            </View>
                            <View style = {styles.button}>
                            <Button
                            title="Remove Ingredient"/>
                            </View>
                        </View>
                    </View>
                    :
                    <Button
                        title="New Pantry"
                        onPress={() => navigation.navigate('NewPantry')}
                    />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#58879d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        width: 300,
        height: 150,
        marginBottom: 500,
        top: 50,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
    },
});
export default Pantry;