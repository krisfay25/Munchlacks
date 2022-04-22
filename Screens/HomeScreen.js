import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                MunchLacks!
            </Text>

            <Button style={styles.button}
                title="Pantry"
                onPress={() => navigation.navigate('Pantry')}
            />

            <Button style={styles.button}
                title="Generate Recipes"
                onPress={() => navigation.navigate('RecipePage')}
            />

            <StatusBar style="auto" />
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
    title: {
        fontSize: 32,
        color: '#ffff',
        fontWeight: 'bold'
    },
    button: {

    }
});

export default HomeScreen;