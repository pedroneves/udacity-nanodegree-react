import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default function DateHeader ({ date }={}) {
	return (
		<Text>
			{date.toLocaleDateString()}
		</Text>
	)
}