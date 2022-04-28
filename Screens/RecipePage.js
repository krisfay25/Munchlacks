import { StyleSheet, Text, View } from 'react-native';


const Recipes = ({ route, navigation }) => {
    let db = route.params;
    /*db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Pantry (Name) values ('Ussop')", null,
            (txObj, resultSet) => {console.log("Success!")},
            (txObj, error) => console.warn('DB error: ',error)
        )
    });*/
    return (
        <View style={styles.container}>
            <Text>
                No recipes for you :(
            </Text>
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
