import React from 'react';
import { Card } from '@rneui/themed';

const RecipeDetailed = ( { route, navigation} ) => {
    let recipe = route.params;
  return (
    <Card>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.FeaturedSubtitle>{recipe.url}</Card.FeaturedSubtitle>
    </Card>
  )
}

export default RecipeDetailed;