import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PaymentsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Pagos</Text>
      <Text style={styles.description}>
        Control de pagos, facturación y finanzas del restaurante
      </Text>
      
      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="payment" size={24} color="#27AE60" />
          <Text style={styles.optionText}>Procesar Pago</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="receipt-long" size={24} color="#2980B9" />
          <Text style={styles.optionText}>Generar Factura</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="credit-card" size={24} color="#8E44AD" />
          <Text style={styles.optionText}>Pagos con Tarjeta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="money" size={24} color="#F39C12" />
          <Text style={styles.optionText}>Pagos en Efectivo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="account-balance" size={24} color="#34495E" />
          <Text style={styles.optionText}>Transferencias Bancarias</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="trending-up" size={24} color="#E67E22" />
          <Text style={styles.optionText}>Ventas del Día</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="bar-chart" size={24} color="#16A085" />
          <Text style={styles.optionText}>Reportes Financieros</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="history" size={24} color="#95A5A6" />
          <Text style={styles.optionText}>Historial de Pagos</Text>
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