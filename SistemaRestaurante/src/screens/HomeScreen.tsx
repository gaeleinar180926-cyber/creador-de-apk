import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema Restaurante</Text>
      <Text style={styles.subtitle}>Panel de Administración</Text>
      
      <ScrollView style={styles.optionsGrid}>
        <TouchableOpacity 
          style={styles.mainOption}
          onPress={() => navigation.navigate('Menu')}
        >
          <MaterialIcons name="restaurant-menu" size={40} color="#4A90E2" />
          <Text style={styles.mainOptionText}>Menú</Text>
          <Text style={styles.mainOptionSubtext}>Gestionar platos y precios</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.mainOption}
          onPress={() => navigation.navigate('Orders')}
        >
          <MaterialIcons name="receipt" size={40} color="#27AE60" />
          <Text style={styles.mainOptionText}>Pedidos</Text>
          <Text style={styles.mainOptionSubtext}>Administrar órdenes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.mainOption}
          onPress={() => navigation.navigate('Inventory')}
        >
          <MaterialIcons name="inventory" size={40} color="#F39C12" />
          <Text style={styles.mainOptionText}>Inventario</Text>
          <Text style={styles.mainOptionSubtext}>Control de stock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.mainOption}
          onPress={() => navigation.navigate('Payments')}
        >
          <MaterialIcons name="payment" size={40} color="#8E44AD" />
          <Text style={styles.mainOptionText}>Pagos</Text>
          <Text style={styles.mainOptionSubtext}>Facturación y finanzas</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0.0 - Sistema de Gestión Restaurante</Text>
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7f8c8d',
  },
  optionsGrid: {
    flex: 1,
  },
  mainOption: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  mainOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2c3e50',
  },
  mainOptionSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 5,
  },
  footer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
  },
});