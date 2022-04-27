import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, ButtonGroup } from '@rneui/base';
import { Header } from '@rneui/themed';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Munchlacks!
            </Text>
            <Image source={require('../Images/munchlax-pokemon.png')}
                style={styles.image}
            />

            <View style={ styles.bottomView}>
            <Button style={styles.button}
                title="Pantry"
                onPress={() => navigation.navigate('Pantry')}
            />

            <Button style={styles.button}
                title="Generate Recipes"
                onPress={() => navigation.navigate('RecipePage')}
            />

            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#58879d',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        marginTop: 100,
    },
    title: {
        fontSize: 32,
        color: '#ffff',
        fontWeight: 'bold',
        top: '5%',
    },
    image: {
        top: '5%',
        width: 200,
        height: 200,
    },
    bottomView:{
        width: '100%', 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 200,
      }
});
/*<Button style={styles.button}
                title="Pantry"
                onPress={() => navigation.navigate('Pantry')}
            />

            <Button style={styles.button}
                title="Generate Recipes"
                onPress={() => navigation.navigate('RecipePage')}
            /> */
export default HomeScreen;