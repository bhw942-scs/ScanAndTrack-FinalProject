import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './ListScreen';
import AddItemScreen from './AddItemScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
   
    <NavigationContainer>
      {/* Screen Stack Definition */}
      <Stack.Navigator 
        initialRouteName="List"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4f46e5', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* List/Inventory Screen */}
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
          options={{ title: 'Scan & Track Inventory' }} 
        />
        
        {/* Screen to Add Item */}
        <Stack.Screen 
          name="Add" 
          component={AddItemScreen} 
          options={{ title: 'Add Item' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;