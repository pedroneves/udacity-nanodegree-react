import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import * as Colors from '../utils/colors';
import { isIOS } from '../utils/helpers';

function renderIOSSteppers (onDecrement, onIncrement) {
	const styleLeft = [styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}];
	const styleRight = [styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0}];

	return (
		<View style={{flexDirection: 'row'}}>
			<TouchableOpacity style={styleLeft} onPress={onDecrement}>
				<Entypo name='minus' size={30} color={Colors.purple} />
			</TouchableOpacity>
			<TouchableOpacity style={styleRight} onPress={onIncrement}>
				<Entypo name='plus' size={30} color={Colors.purple} />
			</TouchableOpacity>
		</View>
	)
}

function renderAndroidSteppers (onDecrement, onIncrement) {
	return (
		<View style={{flexDirection: 'row'}}>
			<TouchableOpacity style={styles.androidBtn} onPress={onDecrement}>
				<FontAwesome name='minus' size={30} color={Colors.white} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.androidBtn} onPress={onIncrement}>
				<FontAwesome name='plus' size={30} color={Colors.white} />
			</TouchableOpacity>
		</View>
	);
}

export default function UdaciStepper ({unit, value, onIncrement, onDecrement}={}) {
	return (
		<View style={[styles.row, {justifyContent: 'space-around'}]}>
			{
				isIOS()
					? renderIOSSteppers(onDecrement, onIncrement)
					: renderAndroidSteppers(onDecrement, onIncrement)
			}
			<View>
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
	androidBtn: {
		margin: 5,
		backgroundColor: Colors.purple,
		padding: 10,
		borderRadius: 2,
	},
	iosBtn: {
		backgroundColor: Colors.white,
		borderColor: Colors.purple,
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		paddingLeft: 25,
		paddingRight: 25,
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center'
	},
})