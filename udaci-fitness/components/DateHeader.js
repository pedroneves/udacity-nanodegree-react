import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Colors from '../utils/colors';

export default function DateHeader ({ date }={}) {
	return (
		<Text style={{ color: Colors.purple, fontSize: 25 }}>
			{date}
		</Text>
	)
}