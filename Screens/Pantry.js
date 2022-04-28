import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';

const Pantry = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Text>
                Pantry is empty!
            </Text>

            <Button style={styles.button}
                title = "New Pantry"
                onPress={() => navigation.navigate('NewPantry')}
            />

            <Button style={styles.button}
                title = "Open Existing Pantry"
            />

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