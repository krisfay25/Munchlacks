import { StyleSheet, Text, View } from 'react-native';

const Pantry = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>
                Pantry is empty!
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

export default Pantry;