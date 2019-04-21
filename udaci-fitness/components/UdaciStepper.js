import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';

export default function UdaciStepper ({unit, value, onIncrement, onDecrement}={}) {
	const size = 30;
	const color = 'black';

	return (
		<View>
			<View>
				<TouchableOpacity onPress={onDecrement}>
					<FontAwesome name="minus" size={size} color={color} />
				</TouchableOpacity>
				<TouchableOpacity onPress={onIncrement}>
					<FontAwesome name="plus" size={size} color={color} />
				</TouchableOpacity>
			</View>
			<View>
				<Text>{value}</Text>
				<Text>{unit}</Text>
			</View>
		</View>
	)
}