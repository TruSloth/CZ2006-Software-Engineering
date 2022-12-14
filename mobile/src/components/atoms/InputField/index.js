import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

/**
 * Custom rendering of text input field with label.
 *
 * @category Components
 * @exports InputField
 * @subcategory Atoms
 *
 * @example <caption>Default example</caption>
 * return(
 *   <InputField
 * 		title={'Email'}
 * 		placeholder={'JohnTan@email.com'}
 * 		updateFieldFunc={(text) => {console.log(`Input changed to ${text}`)}}
 * 		secureTextEntry={false}
 *		value={email}
 *   </InputField>
 * )
 *
 * @property {String} title Label for `InputField`
 * @property {String} placeholder Placeholder text to be used for `InputField`
 * @property {Function} updateFieldFunc Callback to be used when the text in `InputField` changes
 * @property {Boolean} secureTextEntry Whether the text input should be hidden
 * @property {String} value Text to be displayed within the `InputField`
 */

const InputField = (props) => {
	const {title, placeholder, updateFieldFunc, secureTextEntry, value} = props;

	return (
		<View style={{marginVertical: 10}}>
			<Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
				{title}
			</Text>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor='#AAAAAA'
				style={styles.inputField}
				secureTextEntry={secureTextEntry}
				onChangeText={(text) => updateFieldFunc(text)}
				value={value}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputField: {
		borderBottomWidth: 1,
		borderColor: '#A5A6F6',
		borderRadius: 5,
	},
});

export default InputField;
