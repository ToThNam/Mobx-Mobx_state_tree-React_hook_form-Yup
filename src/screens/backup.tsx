import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UserStore from '../store/mobxStateTree';

const MobxStateTreeSchema = yup.object().shape({
  Email: yup
    .string()
    .email("Invalid Email format")
    .required("Email is a required field"),
  Name: yup
    .string()
    .min(5, "Name should be 5-20 characters in length!")
    .required("Name is a required field"),
})
const mobxStateTree = observer(({ navigation }: { navigation: any }) => {
  const [Email, useEmail] = useState('');
  const [Name, useName] = useState('');
  const addUser = () => {
    UserStore.addUser({ Email, Name, id: Math.random().toString() })
  }
  // console.log('Email: ', Email);
  console.log('user: ', UserStore.UserList);
  type FormData = {
    id: string | null;
    Email: string | null;
    Name: string | null;
  };
  const { register, setValue, getValues, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(MobxStateTreeSchema),
    defaultValues: {
      id: '',
      Email: '',
      Name: '',
    },
  });
  useEffect(() => {
    register('id');
    register('Email');
    register('Name');
  }, [register]);
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ marginLeft: 10 }}>Email</Text>
      <TextInput
        onChangeText={useEmail}
        value={Email}
        placeholderTextColor="grey"
        placeholder="Enter your email here"
        style={{
          borderWidth: 1,
          borderColor: '#00CC33',
          height: 40,
          width: 300,
          marginLeft: 40,
          color: 'black',
          marginTop: 10,
        }}
      />
      <Text style={{ marginTop: 10, marginLeft: 10 }}>Name</Text>
      <TextInput
        onChangeText={useName}
        value={Name}
        placeholderTextColor="grey"
        placeholder="Enter your name here"
        style={{
          borderWidth: 1,
          borderColor: '#00CC33',
          height: 40,
          width: 300,
          marginLeft: 40,
          color: 'black',
          marginTop: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => { handleSubmit(addUser) }}
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
        <Text style={{ color: 'white', fontSize: 17 }}>Add user</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
        <Text style={{ color: 'white', fontSize: 17 }}>Back</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={UserStore.UserList}
          renderItem={({ item }: { item: any }) => (
            <View>
              <TouchableOpacity
                onPress={() => { UserStore.removeUser(item) }}>
                <Text>{item.Email}</Text>
                <Text>{item.Name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  )
})
export default mobxStateTree
