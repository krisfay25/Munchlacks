import React from 'react';
import { Card } from '@rneui/themed';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const backgroundImage = { uri: "https://i.pinimg.com/736x/12/cb/cf/12cbcf58bd47376aecea835e0934f6f5.jpg" }

const RecipeDetailed = ({ navigation, route }) => {
  let recipe = route.params;
  const ingredientList = route.params.ingredients;

  return (
    <View>
      <ImageBackground source={backgroundImage} style={styles.container}>
        <Card>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Divider />
          {ingredientList.map((ingredient) => <Text>{ingredient}</Text>)}
          <Card.FeaturedSubtitle>{recipe.url}</Card.FeaturedSubtitle>
        </Card>
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
});

export default RecipeDetailed;