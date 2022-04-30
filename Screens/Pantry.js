import { StyleSheet, Text, View, Modal, Alert, Pressable, TextInput, Button } from 'react-native';
//import { Button } from '@rneui/base';
import { useState } from 'react';
import React from 'react';
import { Card } from '@rneui/themed';

const Pantry = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isPantry, setIsPantry] = useState(false);
    const [pantry, setPantry] = useState([]);
    const [modalAddVisible, setModalAddVisible] = useState(false);
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [input, setInput] = useState('');
    let db = route.params;

    const getPantry = () => {
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
                        // if pantry, collect ingredients and put in local variable
                        db.transaction(tx => {
                            tx.executeSql(
                                "SELECT * FROM Pantry", null,
                                (txObj, resultSet) => {
                                    pantry.splice(0, pantry.length);

                                    resultSet.rows._array.forEach(x => {
                                        pantry.push(x);
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
    }

    const AddIngredient = (ingredient) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Pantry(Name) VALUES (?)", [ingredient],
                (txObj, resultSet) => {
                    setLoading(true);
                    getPantry();
                },
                (txObj, error) => {
                    console.warn('DB error: ', error)
                }
            )
        });
    }

    const RemoveIngredient = (ingredient) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Pantry WHERE NAME = ?", [ingredient],
                (txObj, resultSet) => {
                    setLoading(true);
                    getPantry();
                },
                (txObj, error) => {
                    console.warn('DB error: ', error)
                }
            )
        });
    }

    getPantry();

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalAddVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>What would you like to add?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Example: "Flour"'
                            onChangeText={newText => setInput(newText)}
                        />
                        <Pressable
                            style={[styles.buttonPressable, styles.buttonClose]}
                            onPress={() => {
                                setModalAddVisible(!modalAddVisible);
                                if (input != "") {
                                    let flag = false;
                                    let temp = input[0].toUpperCase() + input.substring(1);
                                    pantry.forEach(x => {
                                        if (x.Name.localeCompare(temp) == 0) {
                                            Alert.alert(temp + " is already in your pantry");
                                            flag = true;
                                        }
                                    })

                                    if (!flag) {
                                        AddIngredient(temp);
                                        navigation.navigate('Pantry', db);
                                    }
                                }

                            }}
                        >
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {loading ? <Text>Loading...</Text> :
                isPantry ?
                    <View>
                        <View style={{ flex: 3 }}>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalRemoveVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalRemoveVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>What would you like to Remove?</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Example: "Flour"'
                                            onChangeText={newText => setInput(newText)}
                                        />
                                        <Pressable
                                            style={[styles.buttonPressable, styles.buttonClose]}
                                            onPress={() => {
                                                setModalRemoveVisible(!modalRemoveVisible);
                                                if (input != "") {
                                                    let flag = false;
                                                    let temp = input[0].toUpperCase() + input.substring(1);
                                                    pantry.forEach(x => {
                                                        if (x.Name.localeCompare(temp) == 0) {
                                                            flag = true;
                                                        }
                                                    })

                                                    if (flag) {
                                                        RemoveIngredient(temp);
                                                        navigation.navigate('Pantry', db);
                                                    }
                                                    else {
                                                        Alert.alert("No match was found in the pantry");
                                                    }
                                                }

                                            }}
                                        >
                                            <Text style={styles.textStyle}>Submit</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title>Pantry</Card.Title>
                                <Card.Divider />
                                {
                                    pantry.map((x, i) => {
                                        return (
                                            <Text key={i}>{x.Name}</Text>
                                        );
                                    })
                                }
                            </Card>

                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button
                                        title="Add Ingredient"
                                        onPress={() => setModalAddVisible(true)} />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title="Remove Ingredient"
                                        onPress={() => setModalRemoveVisible(true)} />
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <View>
                        <View style={{
                            position: 'relative',
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button
                                title="Add Ingredient"
                                onPress={() => setModalAddVisible(true)} />
                        </View>
                    </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#58879d',
        alignItems: 'center',
    },
    cardContainer: {
        width: 300,
        top: 50,
    },
    buttonContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
    },
    button: {
        flex: 1,
        padding: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonPressable: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        width: 200,
        height: 35,
        borderWidth: 1,
        padding: 10
    },
});
export default Pantry;