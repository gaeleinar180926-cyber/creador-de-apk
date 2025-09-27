import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Screen imports
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Sistema Restaurante' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ title: 'Gestión de Menú' }}
        />
        <Stack.Screen 
          name="Orders" 
          component={OrdersScreen} 
          options={{ title: 'Gestión de Pedidos' }}
        />
        <Stack.Screen 
          name="Inventory" 
          component={InventoryScreen} 
          options={{ title: 'Gestión de Inventario' }}
        />
        <Stack.Screen 
          name="Payments" 
          component={PaymentsScreen} 
          options={{ title: 'Gestión de Pagos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
