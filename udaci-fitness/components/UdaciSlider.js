import React from 'react';
import { View, Text, Slider } from 'react-native';

export default function UdaciSlider ({ max, min, step, value, unit, onChange }) {
	return (
		<View>
			<Slider
				step={step}
				value={value}
				minimumValue={min}
				maximumValue={max}
				onValueChange={onChange}
			/>
			<Text>{value}</Text>
			<Text>{unit}</Text>
		</View>
	)
}