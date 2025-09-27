import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MenuScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Menú</Text>
      <Text style={styles.description}>
        Administra los platos, precios y disponibilidad del menú
      </Text>
      
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="restaurant-menu" size={24} color="#4A90E2" />
        <Text style={styles.optionText}>Ver Menú Completo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="add-circle" size={24} color="#4A90E2" />
        <Text style={styles.optionText}>Agregar Nuevo Plato</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="edit" size={24} color="#4A90E2" />
        <Text style={styles.optionText}>Editar Precios</Text>
      </TouchableOpacity>
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