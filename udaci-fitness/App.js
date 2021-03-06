import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from "react-navigation";
import { isIOS } from "./utils/helpers";
import * as Colors from "./utils/colors";
import { Constants } from 'expo';

import reducers from './reducers'

import AddEntry from './components/AddEntry';
import History from './components/History';
import EntryDetail from "./components/EntryDetail";
import Live from './components/Live';

const store = createStore(reducers);

function UdaciStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = TabNavigator({
	History: {
		screen: History,
		navigationOptions: {
			tabBarLabel: 'History',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
		},
	},
	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarLabel: 'Add Entry',
			tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
		},
	},
	Live: {
		screen: Live,
		navigationOptions: {
			tabBarLabel: 'Live',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
		},
	}
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: isIOS() ? Colors.purple : Colors.white,
		style: {
			height: 56,
			backgroundColor: isIOS() ? Colors.white : Colors.purple,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: {
			headerTintColor: Colors.white,
			headerStyle: {
				backgroundColor: Colors.purple,
			}
		}
	}
})

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex:1 }}>
					<UdaciStatusBar backgroundColor={Colors.purple} barStyle="light-content" />
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}