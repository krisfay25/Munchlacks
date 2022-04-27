<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
=======
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import React, {useState} from 'react';
import { ListItem, Avatar } from '@rneui/themed'
import { Button } from '@rneui/base';
>>>>>>> 9c5e5167a0a031a2ad3b1e7222b5580cfa0c3007

const NewPantry = ({ navigation }) => {
    let ingredients = [{text: "INGREDIENTS"}]

    const [ingredient, setIngredient] = useState(ingredients);

    const addIngredient = () => {
        if (ingredient == "") return

        ingredients.push({ingredient})
        setIngredient('')
        
    }

    const logInput = (input)=>{
        setIngredient(input)
    }

    return (
        <View style={styles.container}>

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
});

export default NewPantry;