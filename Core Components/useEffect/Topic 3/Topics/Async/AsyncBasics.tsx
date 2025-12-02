import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function AsyncBasics() {
  const [message, setMessage] = useState<string>("wait");

  useEffect(() => {
    const loadMessage = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage("Here is your delivery!")
    };

    loadMessage();
  }, [])
}