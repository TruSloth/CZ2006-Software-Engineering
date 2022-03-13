import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {toggleLogIn} from '../../store/auth/actions';

import LoginContent from '../../components/organisms/LoginContent';
import {login} from '../../services/auth/login';
import {useMutation} from 'react-query';

const LoginScreen = ({navigation}) => {
	const isDarkMode = useColorScheme() === 'dark';

	const registerOnPress = () => {
		navigation.navigate('Registration')
	}

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const dispatch = useDispatch();

	const loginMutation = useMutation(login);

	const isLoading = loginMutation.isLoading;

	const submitForm = async (email, password) => {
		try {
			const response = await loginMutation.mutateAsync({email: email, password: password});

			if (response.status === 200) {
				dispatch(toggleLogIn(true));
			}
		} catch (e) {
			console.log(e)
		}
	
	};

	return (
		<SafeAreaView style={[backgroundStyle, {flex: 1, padding: 10}]}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<LoginContent submitForm={submitForm} registerOnPress={registerOnPress} loading={isLoading}></LoginContent>
		</SafeAreaView>
	);
};

export default LoginScreen;
