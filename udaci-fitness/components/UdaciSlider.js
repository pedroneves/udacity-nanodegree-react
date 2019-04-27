import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import * as Colors from '../utils/colors';

export default function UdaciSlider ({ max, min, step, value, unit, onChange }) {
	return (
		<View style={styles.row}>
			<Slider
				style={{flex: 1}}
				step={step}
				value={value}
				minimumValue={min}
				maximumValue={max}
				onValueChange={onChange}
			/>
			<View style={styles.metricCounter}>
				<Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
				<Text style={{fontSize: 18, textAlign: 'center'}}>{unit}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center'
	},
})