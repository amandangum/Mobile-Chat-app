import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const chatHeader = ({userName, bio, picture, onlineStatus, onPress})  => {
  return (
   <View style={styles.container}> 
    <TouchableOpacity>

    </TouchableOpacity>
   </View>
  )
}

export default chatHeader

const styles = StyleSheet.create({
   container: {
    flexDirection: "row",
}
})