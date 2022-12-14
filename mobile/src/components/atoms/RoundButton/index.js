import React from 'react';

import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	ActivityIndicator,
} from 'react-native';

/**
 * Renders a Round Cornered Button with an optional loading indicator.
 *
 * @category Components
 * @exports RoundButton
 * @subcategory Atoms
 *
 * @example <caption>Default example</caption>
 * return(
 *   <RoundButton							
 * 		style={{
			backgroundColor: '#7879F1'
 		}}
		title={'Submit'}
		onPress={() => {console.log('Button Pressed')}}
		loading={false}
		disabled={false}
 *   </RoundButton>
 * )
 *
 * @property {object(style)} style Additional style to be passed to `RoundButton`
 * @property {String} title Text to be used inside `RoundButton`
 * @property {Function} onPress Callback used when `RoundButton` is pressed
 * @property {Boolean} loading Whether `RoundButton` should display a loading indicator instead of `title`
 * @property {Boolean} disabled Whether `RoundButton` should be disabled
 */

const RoundButton = (props) => {
	const {style, title, onPress, loading, disabled} = props;

	return loading ? (
		<View style={[styles.loginButton, style]}>
			<ActivityIndicator color={'#000000'}></ActivityIndicator>
		</View>
	) : (
		<TouchableOpacity
			style={[styles.loginButton, style]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text
				style={[
					{
						alignContent: 'center',
						color: '#000000',
						fontWeight: 'bold',
					},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	loginButton: {
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
		marginVertical: 10,
		backgroundColor: '#FCDDEC',
	},

	btnText: {
		alignContent: 'center', 
		color: '#7879F1'
	}
});

export default RoundButton;
