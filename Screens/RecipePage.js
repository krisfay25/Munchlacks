import { StyleSheet, Text, View, Alert, Modal, FlatList, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import React from 'react';

const Breakfast = 0;
const Lunch = 1;
const Dinner = 2;
const Snack = 3;

//Types/Styles of food
const foodTypes = [
    {
        id: "1",
        type: "American"
    },
    {
        id: "2",
        type: "Mexican"
    },
    {
        id: "3",
        type: "Italian"
    },
    {
        id: "4",
        type: "Chinese"
    },
    {
        id: "5",
        type: "Indian"
    },
    {
        id: "6",
        type: "Thai"
    },
    {
        id: "7",
        type: "Greek"
    },
    {
        id: "8",
        type: "Japanese"
    },
    {
        id: "9",
        type: "Nigerian"
    },
    {
        id: "10",
        type: "Filipino"
    },
    {
        id: "11",
        type: "Vietnamese"
    },
    {
        id: "12",
        type: "Korean"
    },
    {
        id: "13",
        type: "Cambodian"
    },
    {
        id: "14",
        type: "French"
    }
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.type, textColor]}>{item.type}</Text>
    </TouchableOpacity>
);

const Recipes = ({ route, navigation }) => {
    var foodType;
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(true);
    const [cuisineVisible, setCuisineVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    let db = route.params;

    db.transaction(tx => {
        tx.executeSql(
            "SELECT COUNT(*) AS num FROM Pantry", null,
            (txObj, resultSet) => {
                if (resultSet.rows._array[0]["num"] == 0) {
                    Alert.alert("Please Create a Pantry First");
                }
                else {
                    setLoading(false);
                }
            },
            (txObj, error) => console.warn('DB error: ', error)
        )
    });

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#d7da58" : "#f5f6d5";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            {loading ? <Text>Generating Yummy Recipes....</Text> :
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate('Home');
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>What Time is it?</Text>
                                <View style={styles.button}>
                                    <Button title={"Breakfast"}
                                        onPress={() => {
                                            foodType = Breakfast;
                                            setModalVisible(false);
                                            setCuisineVisible(true);
                                        }} />
                                </View>
                                <View style={styles.button}>
                                    <Button title={"Lunch"}
                                        onPress={() => {
                                            foodType = Lunch;
                                            setModalVisible(false);
                                            setCuisineVisible(true);
                                        }} />
                                </View>
                                <View style={styles.button}>
                                    <Button title={"Dinner"}
                                        onPress={() => {
                                            foodType = Dinner;
                                            setModalVisible(false);
                                            setCuisineVisible(true);
                                        }} />
                                </View>
                                <View style={styles.button}>
                                    <Button title={"Snack"}
                                        onPress={() => {
                                            foodType = Snack;
                                            setModalVisible(false);
                                            setCuisineVisible(true);
                                        }} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={cuisineVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                            setCuisineVisible(!cuisineVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>What Type of Cuisine Would You Like?</Text>
                                <FlatList
                                    data={foodTypes}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    extraData={selectedId}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
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
    button: {
        borderRadius: 30,
        padding: 5,
        width: 250,
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
        textAlign: "center",
        fontSize: 32,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    type: {
        fontSize: 32,
    },
});

export default Recipes;
