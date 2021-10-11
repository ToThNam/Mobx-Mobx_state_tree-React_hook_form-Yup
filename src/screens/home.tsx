import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function home({ navigation }: { navigation: any }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('mobx')}
        style={{
          backgroundColor: '#00CC33',
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 200,
          marginLeft: 100,
        }}>
        <Text style={{ color: 'white', fontSize: 17 }}>Mobx</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('mobxStateTree')}
        style={{
          backgroundColor: '#00CC33',
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 10,
          marginLeft: 100,
        }}>
        <Text style={{ color: 'white', fontSize: 17 }}>Mobx State Tree</Text>
      </TouchableOpacity>
    </View>
  )
}
