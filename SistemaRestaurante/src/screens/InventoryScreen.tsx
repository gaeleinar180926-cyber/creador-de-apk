import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function InventoryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Inventario</Text>
      <Text style={styles.description}>
        Control de stock y materias primas del restaurante
      </Text>
      
      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="inventory" size={24} color="#2980B9" />
          <Text style={styles.optionText}>Ver Inventario Actual</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="add-box" size={24} color="#27AE60" />
          <Text style={styles.optionText}>Agregar Productos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="remove-circle" size={24} color="#E74C3C" />
          <Text style={styles.optionText}>Registrar Salida</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="warning" size={24} color="#F39C12" />
          <Text style={styles.optionText}>Stock Bajo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#8E44AD" />
          <Text style={styles.optionText}>Escanear Código de Barras</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="receipt" size={24} color="#34495E" />
          <Text style={styles.optionText}>Reportes de Inventario</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="settings" size={24} color="#95A5A6" />
          <Text style={styles.optionText}>Configurar Alertas</Text>
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