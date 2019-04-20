import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';

import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';

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

		return (
			<View>
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
			</View>
		)
	}
}