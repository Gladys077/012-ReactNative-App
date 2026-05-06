web application/stitch/projects/9993107665831745335/screens/6f40dc0c21104ca997c7f3ee82a6407d
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const TipsFAB = ({ onPress }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.fab} 
      onPress={onPress}
    >
      <View style={styles.content}>
        {/* Icono de lamparita (Emoji o Icon Library) */}
        <Text style={styles.icon}>💡</Text>
        <Text style={styles.text}>Tips</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    // Ajustado para quedar en la esquina inferior derecha, 
    // alineado con la zona de acciones secundarias
    bottom: 100, 
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // Sombra para dar elevación (Android)
    elevation: 5,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  text: {
    color: '#051424',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System', // Cambiar por Manrope si está disponible
  },
});

export default TipsFAB;