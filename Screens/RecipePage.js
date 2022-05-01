import { StyleSheet, Text, View, Alert, Modal, FlatList, TouchableOpacity, Linking, ImageBackground, Button } from 'react-native';
import React, { useState } from 'react';
import RecipeData from './../test_recipes.json';
import { Card, Icon } from '@rneui/themed';

const Breakfast = 0;
const Lunch = 1;
const Dinner = 2;
const Snack = 3;
const backgroundImage = { uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg" };


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
    const [foodType, setFoodType] = useState({});
    const [loading, setLoading] = useState(true);
    const [recipesGenerated, setRecipesGenerated] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [cuisineVisible, setCuisineVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [pantry, setPantry] = useState([]);
    const [recipes, setRecipes] = useState([]);
    let db = route.params;

    const getPantry = () => {
        // checks the database whether there is an existing pantry
        db.transaction(tx => {
            tx.executeSql(
                "SELECT COUNT(*) AS num FROM Pantry", null,
                (txObj, resultSet) => {
                    if (resultSet.rows._array[0]["num"] == 0) {
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

    const getFilteredRecipes = (foodTime) => {
        var flag = false;
        var flag2 = false;
        switch (foodTime) {
            case Breakfast:
                RecipeData.breakfast.forEach(x => {
                    x.ingredients.forEach(y => {
                        pantry.forEach(z => {
                            if (y.localeCompare(z.Name) == 0) {
                                flag2 = true;
                            }
                        })

                        if (!flag2) {
                            flag = true;
                        }
                        flag2 = false;

                    })
                    if (!flag) {
                        recipes.push(x);
                    }
                    flag = false;
                })
                break;

            case Lunch:
                RecipeData.lunch.forEach(x => {
                    x.ingredients.forEach(y => {
                        pantry.forEach(z => {
                            if (y.localeCompare(z.Name) == 0) {
                                flag2 = true;
                            }
                        })

                        if (!flag2) {
                            flag = true;
                        }
                        flag2 = false;

                    })
                    if (!flag) {
                        recipes.push(x);
                    }
                    flag = false;
                })
                break;

            case Dinner:
                RecipeData.dinner.forEach(x => {
                    x.ingredients.forEach(y => {
                        pantry.forEach(z => {
                            console.log(y + ", " + z.Name + " = " + y.localeCompare(z.Name));
                            if (y.localeCompare(z.Name) == 0) {
                                flag2 = true;
                            }
                        })

                        if (!flag2) {
                            flag = true;
                        }
                        flag2 = false;

                    })
                    if (!flag) {
                        recipes.push(x);
                    }
                    flag = false;
                })
                break;
        }
        setRecipesGenerated(true);
        console.log(recipes);
    }

    getPantry();

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
                onPress={() => {
                    setSelectedId(item.id);
                    getFilteredRecipes(foodType);
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const recipeItem = ({ item }) => {
        return (
            <Card onPress={() => navigation.navigate('RecipeDetailed', item)}>
                <Card.Title onPress={() => navigation.navigate('RecipeDetailed', item)}>{item.name}</Card.Title>
                <Card.Divider />
                <Text style={{ color: 'blue' }} onPress={() =>
                    Linking.openURL(item.url)}>{item.url}</Text>
            </Card>
        );
    };

    return (
        <View style={styles.container}>

            <ImageBackground source={backgroundImage} style={styles.container}>
                {loading ? <Text>Generating Yummy Recipes....</Text> :
                    recipesGenerated ?
                        <View style={{ position: 'absolute', alignItems: 'center' }}>
                            <FlatList
                                data={recipes}
                                renderItem={recipeItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        :
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
                                <View style={styles.icon}>
                                    <Icon
                                        raised
                                        name='home'
                                        type='font-awesome'
                                        color="#1E6738"
                                        onPress={() => navigation.navigate('Home')}
                                    />
                                </View>

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>What Time is it?</Text>
                                        <View style={styles.button}>
                                            <Button
                                                title="Breakfast"
                                                color="#1E6738"
                                                onPress={() => {
                                                    setFoodType(Breakfast);
                                                    setModalVisible(false);
                                                    setCuisineVisible(true);
                                                }}
                                            />
                                        </View>
                                        <View style={styles.button}>
                                            <Button title={"Lunch"} color="#1E6738"
                                                onPress={() => {
                                                    setFoodType(Lunch);
                                                    setModalVisible(false);
                                                    setCuisineVisible(true);
                                                }} />
                                        </View>
                                        <View style={styles.button}>
                                            <Button
                                                title={"Dinner"}
                                                color="#1E6738"
                                                onPress={() => {
                                                    setFoodType(Dinner);
                                                    setModalVisible(false);
                                                    setCuisineVisible(true);
                                                }} />
                                        </View>
                                        <View style={styles.button}>
                                            <Button color="#1E6738"
                                                title={"Snack"}
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
                        </View >
                }

                <View style={styles.icon}>
                    <Icon
                        raised
                        name='home'
                        type='font-awesome'
                        color="#1E6738"
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </ImageBackground>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        elevation: 5,
        bottom: 50
    },
    button: {
        borderRadius: 30,
        color: "#1E6738",
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
    icon: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        paddingRight: 30,
        bottom: 700,
    },
});

export default Recipes;
