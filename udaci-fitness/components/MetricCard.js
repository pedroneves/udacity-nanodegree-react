import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateHeader from './DateHeader'
import { getMetricMetaInfo } from '../utils/helpers'
import { gray } from '../utils/colors'

function Card ({ metric, value }={}) {
	const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)

	return (
		<View style={styles.metric}>
			{getIcon()}
			<View>
				<Text style={{fontSize: 20}}>
					{displayName}
				</Text>
				<Text style={{fontSize: 16, color: gray}}>
					{value} {unit}
				</Text>
			</View>
		</View>
	)
}

export default function MetricCard ({ date, metrics }={}) {
	return (
		<View>
			{date && <DateHeader date={date} />}
			{Object.keys(metrics).map((metric) => (
				<Card key={metric} metric={metric} value={metrics[metric]} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	metric: {
		flexDirection: 'row',
		marginTop: 12
	}
})