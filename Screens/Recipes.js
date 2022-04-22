import { StyleSheet, Text, View } from 'react-native';

const Recipes = ({ navigation }) => {
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
