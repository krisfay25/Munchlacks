import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';

const Recipes = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
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
    return (
        <View style={styles.container}>
            {loading ? <Text>Loading...</Text> :
                <Text>Done!</Text>
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
});

export default Recipes;
