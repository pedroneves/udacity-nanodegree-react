import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import * as Colors from '../utils/colors';

import MetricCard from './MetricCard';

class EntryDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params;

		const year = entryId.slice(0,4)
		const month = entryId.slice(5,7)
		const day = entryId.slice(8)

		return {
			title: `${day}/${month}/${year}`
		}
	}

	render() {
		const { metrics } = this.props;

		return (
			<View style={styles.container}>
				<MetricCard metrics={metrics} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		padding: 15
	}
});

function mapStateToProps (state, { navigation }) {
	const { entryId } = navigation.state.params;
	const metrics = state[entryId];
	return { entryId, metrics }
}

export default connect(mapStateToProps)(EntryDetail);