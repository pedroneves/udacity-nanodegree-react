import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue, isIOS } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import * as Colors from '../utils/colors';
import DateHeader from './DateHeader'
import MetricCard from './MetricCard';

class History extends Component {
	componentDidMount () {
		const { dispatch } = this.props

		fetchCalendarResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({ entries }) => {
				if (!entries[timeToString()]) {
					dispatch(
						addEntry({
							[timeToString()]: getDailyReminderValue()
						})
					);
				}
			})
			.then(() => this.setState(() => ({ready: true})))
	}

	renderToday ({ today, formattedDate }={}) {
		return (
			<View>
				<DateHeader date={formattedDate}/>
				<Text style={styles.noDataText}>
					{today}
				</Text>
			</View>
		)
	}

	renderItemMetrics ({ metrics, formattedDate, key }) {
		const { navigate } = this.props.navigation;
		const entryOptions = { entryId: key }

		return (
			<TouchableOpacity onPress={() => navigate('EntryDetail', entryOptions)} >
				<MetricCard metrics={metrics} date={formattedDate} />
			</TouchableOpacity>
		)
	}

	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View style={styles.item}>
			{
				today
					? this.renderToday({ today, formattedDate })
					: this.renderItemMetrics({ metrics, formattedDate, key })
			}
		</View>
	)

	renderEmptyDate(formattedDate) {
		return (
			<View style={styles.item}>
				<DateHeader date={formattedDate}/>
				<Text style={styles.noDataText}>
					You didn't log any data on this day.
				</Text>
			</View>
		)
	}


	render() {
		const { entries } = this.props

		return (
			<UdaciFitnessCalendar
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		)
	}
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: Colors.white,
		borderRadius: isIOS() ? 16 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
	},
	noDataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	}
})

function mapStateToProps (entries) {
	return { entries }
}

export default connect(mapStateToProps)(History);