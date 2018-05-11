// Import a library to help create a Component
import React from 'react';
import { Text, View } from 'react-native';

// Create a Component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};
const styles = {
  viewStyle: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center', // Vertical spacing
    alignItems: 'center', // Horizontal spacing
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  textStyle: {
    fontSize: 20
  }
};

// Make the component available to other parts of the App
// Must export statements to make it available

export { Header }; // Refactored code due to the index.js file needing a different structure
