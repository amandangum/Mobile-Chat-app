import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import {Alert, StyleSheet, TouchableOpacity} from 'react-native'

export const SpecialButton = () => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert("Special Tab Button")
    }
  return (
    <TouchableOpacity onPress={handlePress} style={styles.button} activeOpacity={0.85}>
        <Ionicons name="add-circle" size={40} color="#fff"/>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: -3, // adjust to float above the tab bar
    left: '50%',
    transform: [{ translateX: -30 }], // half of width to center horizontally
    backgroundColor: "#007bff",
    borderRadius: 40, // half of width/height
    width: 70,
    height: 70,
    justifyContent: "center", // centers vertically
    alignItems: "center",     // centers horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // for Android shadow
  },
})