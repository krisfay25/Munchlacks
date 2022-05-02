import { StyleSheet, Text, View, Alert, Modal, FlatList, Linking, ImageBackground, Button } from 'react-native';
import React, { useState } from 'react';
import RecipeData from './../test_recipes.json';
import { Card, Icon } from '@rneui/themed';

const Breakfast = 0;
const Lunch = 1;
const Dinner = 2;
const Snack = 3;
const backgroundImage = { uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg" };

const Recipes = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [recipesGenerated, setRecipesGenerated] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [pantry, setPantry] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [oneOff, setOneOff] = useState([]);
    const [noRecipes, setNoRecipes] = useState(false);
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
        let count = 0;
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
                        else {
                            count++;
                        }

                        flag2 = false;

                    })
                    if (!flag) {
                        recipes.push(x);
                    }

                    else if (count == x.ingredients.length - 1) {
                        oneOff.push(x);
                    }
                    count = 0;
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
                        else {
                            count++;
                        }

                        flag2 = false;

                    })
                    if (!flag) {
                        recipes.push(x);
                    }

                    else if (count == x.ingredients.length - 1) {
                        oneOff.push(x);
                    }
                    count = 0;
                    flag = false;
                })
                break;

            case Dinner:
                RecipeData.dinner.forEach(x => {
                    x.ingredients.forEach(y => {
                        pantry.forEach(z => {
                            if (y.localeCompare(z.Name) == 0) {
                                flag2 = true;
                            }
                        })

                        if (!flag2) {
                            flag = true;
                        }
                        else {
                            count++;
                        }
                        flag2 = false;

                    })
                    if (!flag) {
                        recipes.push(x);
                    }
                    else if (count == x.ingredients.length - 1) {
                        oneOff.push(x);
                    }
                    count = 0;
                    flag = false;
                })
                break;
        }

        if (recipes.length == 0) {
            // search for recipes missing one ingredient
            setNoRecipes(true);
        }
        setRecipesGenerated(true);
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
                        noRecipes ?
                            oneOff.length > 0 ?
                                <View style={{ position: 'absolute', alignItems: 'center' }}>
                                    <Card>
                                        <Card.Title>No recipes can be made with your current ingredients,
                                            but with one extra ingredient you could make...
                                        </Card.Title>
                                    </Card>
                                    <FlatList
                                        data={oneOff}
                                        renderItem={recipeItem}
                                        keyExtractor={item => item.id}
                                    />
                                </View>

                                :
                                    <Card>
                                        <Card.Title>No recipes can be made with your current ingredients.
                                            Consider adding more or select another category</Card.Title>
                                    </Card>
                            :
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

                                <View
                                    style={styles.centeredView}
                                    accessible={true}
                                    accessibilityLabel="Choose what time of day it is to eat or choose the timing of your choice.">
                                    <View style={styles.modalView}>
                                        <Text
                                            style={styles.modalText}>What Time is it?</Text>
                                        <View style={styles.button}>
                                            <Button
                                                accessibilityRole="button"
                                                accessible={true}
                                                accessibilityLabel="Breakfast"
                                                title="Breakfast"
                                                color="#1E6738"
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    getFilteredRecipes(Breakfast);
                                                }}
                                            />
                                        </View>
                                        <View style={styles.button}>
                                            <Button
                                                title={"Lunch"}
                                                color="#1E6738"
                                                accessibilityRole="button"
                                                accessible={true}
                                                accessibilityLabel="Lunch"
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    getFilteredRecipes(Lunch);
                                                }} />
                                        </View>
                                        <View style={styles.button}>
                                            <Button
                                                title={"Dinner"}
                                                color="#1E6738"
                                                accessibilityRole="button"
                                                accessible={true}
                                                accessibilityLabel="Dinner"
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    getFilteredRecipes(Dinner);
                                                }} />
                                        </View>
                                        <View style={styles.button}>
                                            <Button
                                                accessibilityRole="button"
                                                accessible={true}
                                                accessibilityLabel="Snack"
                                                color="#1E6738"
                                                title={"Snack"}
                                                onPress={() => {
                                                    setModalVisible(false);
                                                    getFilteredRecipes(Snack);
                                                }} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View >
                }

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
