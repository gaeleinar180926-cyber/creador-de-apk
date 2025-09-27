import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function OrdersScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Pedidos</Text>
      <Text style={styles.description}>
        Administra todos los pedidos del restaurante
      </Text>
      
      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="add-shopping-cart" size={24} color="#27AE60" />
          <Text style={styles.optionText}>Nuevo Pedido</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="pending" size={24} color="#F39C12" />
          <Text style={styles.optionText}>Pedidos Pendientes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="kitchen" size={24} color="#E74C3C" />
          <Text style={styles.optionText}>En Cocina</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="delivery-dining" size={24} color="#8E44AD" />
          <Text style={styles.optionText}>Listos para Servir</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="done-all" size={24} color="#27AE60" />
          <Text style={styles.optionText}>Pedidos Completados</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="analytics" size={24} color="#34495E" />
          <Text style={styles.optionText}>Estadísticas de Pedidos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#2c3e50',
  },
});