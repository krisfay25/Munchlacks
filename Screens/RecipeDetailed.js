import React from 'react';
import { Card, Icon } from '@rneui/themed';
import { View, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.AppDB');

const backgroundImage = { uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg" }

const RecipeDetailed = ({ navigation, route }) => {
  let recipe = route.params;
  const ingredientList = route.params.ingredients;
  const steps = route.params.steps;

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.container}>
        <View style={styles.cardStyle}>
            <Card>
              <Card.Title>{recipe.name}</Card.Title>
              <Card.Divider />
              <Text style={styles.steps}>{'\n'}Ingredients: </Text>
              <ScrollView style={styles.scrollView}>
              {ingredientList.map((ingredient, i) => <Text key={i}>{ingredient}</Text>)}
              </ScrollView>
              <Text style={styles.steps}>{'\n'}Steps: </Text>
              <ScrollView style={styles.scrollView}>
              {steps.map((step, i) => <Text key={i}>{'\n'}{step}</Text>)}
              </ScrollView>
              <Card.FeaturedSubtitle>{recipe.url}</Card.FeaturedSubtitle>
            </Card>
        </View>
        <View style={styles.icon}>
          <Icon
            raised
            name='home'
            type='font-awesome'
            color="#1E6738"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={styles.icon2}>
          <Icon
            raised
            name='reply'
            type='font-awesome'
            color="#1E6738"
            onPress={() => navigation.navigate('RecipePage', db)}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 25,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    top: 140,
    height: '75%'
  },
  icon: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    paddingRight: 30,
    bottom: 700,
  },
  icon2: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    paddingRight: 300,
    bottom: 700,
  },
  steps: {
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: '35%',
    width: "95%"
  },
});

export default RecipeDetailed;