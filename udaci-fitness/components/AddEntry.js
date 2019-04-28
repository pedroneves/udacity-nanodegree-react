import * as API from '../utils/api';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
	getMetricMetaInfo,
	timeToString,
	getDailyReminderValue,
	isIOS,
	isAndroid
} from '../utils/helpers';
import * as Colors from '../utils/colors';

import { addEntry } from '../actions'

import DateHeader from './DateHeader';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import TextButton from './TextButton';

function SubmitBtn ({ onPress=(()=>{}) }={}) {
	const style = isIOS() ? styles.iosSubmitBtn : styles.androidSubmitBtn

	return (
		<TouchableOpacity onPress={onPress} style={style}>
			<Text style={styles.submitBtnText}>SUBMIT</Text>
		</TouchableOpacity>
	)
}

function clip (val, {min=-Infinity, max=Infinity}={}) {
	if (val < min) {
		return min
	} else if (val > max) {
		return max
	} else {
		return val;
	}
}

class AddEntry extends Component {
	constructor (props) {
		super(props);

		this.state = {
			run: 0,
			bike: 0,
			swim: 0,
			eat: 0,
			sleep: 0
		}
	}

	reset () {
		this.setState(current => {
			return {
				run: 0,
				bike: 0,
				swim: 0,
				eat: 0,
				sleep: 0
			};
		})
	}

	getEntry () {
		return Object.assign({}, this.state);
	}

	increment (metric) {
		const { max, step } = getMetricMetaInfo(metric);
		this.setState(state => {
			const current = state[metric];
			return {
				...state,
				[metric]: clip((current + step), { max })
			}
		})
	}

	decrement (metric) {
		const { min = 0, step } = getMetricMetaInfo(metric);
		this.setState(state => {
			const current = state[metric];
			return {
				...state,
				[metric]: clip((current - step), { min })
			}
		})
	}

	slide (metric, value) {
		this.setState(state => {
			return {
				...state,
				[metric]: value
			}
		})
	}

	submit = () => {
		const key = timeToString();
		const entry = this.getEntry();

		// TODOS
		this.props.dispatch(addEntry({ [key]: entry }));
		// Navigate to Home
		API.submitEntry({entry, key});
	}

	resetEntry = () => {
		const key = timeToString();

		// TODOS
		this.props.dispatch(addEntry({ [key]: getDailyReminderValue() }));
		this.reset()
		// Navigate to Home
		API.removeEntry(key);
		// Clean local notification
	}

	renderMetricSwitcher (metric, type, initialValue, switcherProps) {
		let switcher;

		if (type === 'slider') {
			switcher = (
				<UdaciSlider
					value={initialValue}
					onChange={(value) => this.slide(metric, value)}
					{...switcherProps}
				/>
			);
		} else if (type === 'steppers') {
			switcher = (
				<UdaciStepper
					value={initialValue}
					onIncrement={() => this.increment(metric)}
					onDecrement={() => this.decrement(metric)}
					{...switcherProps}
				/>
			);
		}

		return switcher
	}

	render () {
		const metaInfo = getMetricMetaInfo();
		const metrics = Object.keys(metaInfo);

		if (this.props.alreadyLogged) {
			return (
				<View style={styles.center}>
					<Ionicons
						name={ isIOS() ? 'ios-happy' : 'md-happy' }
						size={100}
					/>
					<Text>You already logged your information for today</Text>
					<TextButton onPress={this.resetEntry}>
						<Text>Reset</Text>
					</TextButton>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				<DateHeader date={(new Date()).toLocaleDateString()} />
				{
					metrics.map(metric => {
						const { getIcon, type, ...rest } = metaInfo[metric];
						const value = this.state[metric];

						return (
							<View key={metric} style={styles.row}>
								{ getIcon() }
								{this.renderMetricSwitcher(metric, type, value, rest)}
							</View>
						);
					})
				}
				<SubmitBtn onPress={this.submit} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: Colors.white
	},
	row: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center"
	},
	iosSubmitBtn: {
		backgroundColor: Colors.purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidSubmitBtn: {
		backgroundColor: Colors.purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: "flex-end",
		justifyContent: "center",
		alignItems: "center"
	},
	submitBtnText: {
		color: Colors.white,
		fontSize: 22,
		textAlign: "center"
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 30,
		marginRight: 30
	}
});

function mapStateToProps (state) {
	const key = timeToString();

	return {
		alreadyLogged: Boolean(state[key]) && !Boolean(state[key].today)
	}
}

export default connect(mapStateToProps)(AddEntry);