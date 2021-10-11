import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { userInfor, UserType } from '../store/mobx';
import { Observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const MobxSchema = yup.object().shape({
  Email: yup
    .string()
    .email("Invalid Email format")
    .required("Email is a required field"),
  Name: yup
    .string()
    .min(5, "Name should be 5-20 characters in length!")
    .required("Name is a required field"),
})

type FormData = {
  id: string;
  Email: string;
  Name: string;
};

const mobx = ({ navigation }: { navigation: any }) => {
  const { register, setValue, getValues, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(MobxSchema),
    defaultValues: {
      Email: '',
      Name: '',
    },
  });
  useEffect(() => {
    register('Email');
    register('Name');
  }, [register]);

  const addUser = (data: any) => {

    const dataStore = { ...data, id: Math.random().toString() }
    console.log(dataStore)
    userInfor.addUser(dataStore)
  }
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ marginLeft: 10 }}>Email</Text>
      <Controller
        control={control}
        name="Email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            value={value}
            onChangeText={(val: string) => {
              onChange(val);
              setValue('Email', val);
            }}
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
        )}
      />
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        {errors.Email && (
          <Text style={{ color: 'red', position: 'absolute' }}>{errors.Email.message}</Text>
        )}
      </View>
      <Text style={{ marginTop: 10, marginLeft: 10 }}>Name</Text>
      <Controller
        control={control}
        name="Name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            value={value}
            onChangeText={(val: string) => {
              onChange(val);
              setValue('Name', val);
            }}
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
        )}
      />
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        {errors.Name && (
          <Text style={{ color: 'red', position: 'absolute' }}>{errors.Name.message}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={handleSubmit(addUser)}
        style={{
          backgroundColor: '#00CC33',
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 30,
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
      <Observer>
        {() => (
          <FlatList
            data={userInfor.UserList.data}
            renderItem={({ item }: { item: UserType }) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    userInfor.deleteUser(item?.id)
                  }
                >
                  <Text>{item?.Email}</Text>
                  <Text>{item?.Name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </Observer>
    </View >
  );
};

export default mobx;