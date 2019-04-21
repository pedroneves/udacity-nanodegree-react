import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import {Ionicons} from '@expo/vector-icons'

import DateHeader from './DateHeader';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import TextButton from './TextButton';

function SubmitBtn ({ onPress=(()=>{}) }={}) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>SUBMIT</Text>
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

export default class AddEntry extends Component {
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
		// Update redux
		// Navigate to Home
		// Save to DB
	}

	resetEntry = () => {
		const key = timeToString();

		// TODOS
		// Update redux

		this.reset()

		// Navigate to Home
		// Save to DB
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
				<View>
					<Ionicons
						name="md-happy"
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
			<View>
				<DateHeader date={new Date()} />
				{
					metrics.map(metric => {
						const { getIcon, type, ...rest } = metaInfo[metric];
						const value = this.state[metric];

						return (
							<View key={metric}>
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