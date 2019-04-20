import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
	render() {
		debugger
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Ionicons name='ios-pizza' size={100} color='red' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
