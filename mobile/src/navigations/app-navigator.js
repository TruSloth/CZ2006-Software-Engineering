import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text} from 'react-native';
import { Icon } from 'react-native-elements';

import QRCodeReaderScreen from '../scenes/QRCodeReader';

import HomeNavigator from './UserNavigators/home-navigator';
import ServiceProviderHomeNavigator from './ServiceProviderNavigators/home-navigator';
import ChatNavigator from './UserNavigators/chat-navigator';
import AccountNavigator from './UserNavigators/account-navigator';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

/**
 * Tab navigator for the main application.
 *
 * Controls tab based navigation for `Home`, `Chat`, `Notifications` and `Account` tabs.
 *
 * @category Navigations
 * @exports AppNavigator
 *
 */

const AppNavigator = () => {
	const account = useSelector((state) => state.account);

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
                let iconName;
                let reverse = false;
                let focusedColor = '#AAAAAA';
                let unfocusedColor = '#C4C4C4';
                switch (route.name) {
                    case 'Home':
                        iconName = 'home-filled'
                        break;
                    case 'QRCodeReader':
                        iconName = 'qr-code-scanner'
                        reverse = true;
                        unfocusedColor = '#E89575'
                        break;
                    case 'Account':
                        iconName = 'person'
                        break;
                    default:
                        break;
                }
        
                return <Icon name={iconName} color={focused ? focusedColor : unfocusedColor} reverse={reverse}></Icon>
            },
            tabBarLabel: ({focused}) => {
                const textColor = focused ? "#AAAAAA" : "#C4C4C4"

                return (route.name === 'QRCodeReader') || (route.name === 'Chat') ? 
                <></> :
                <Text style={{color: textColor, fontSize: 10}}>{route.name}</Text>
            },
            tabBarButton: (props) => {
                return route.name === 'Chat' ? <></> :
                <TouchableOpacity {...props}></TouchableOpacity>
            },
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {justifyContent: 'center', paddingVertical: 10},
            lazy: false,
            tabBarStyle: {height: 60, backgroundColor: '#FFF8FA'}
        })} 
        >
            {(() => {
                    switch(account.accountType) {
                        case 'User':
                            return (<Tab.Group>
                                        <Tab.Screen name="Home" component={HomeNavigator} options={{headerShown: false}}></Tab.Screen>
                                        <Tab.Screen name="Chat" component={ChatNavigator} options={{headerShown: false}}></Tab.Screen>
                                        <Tab.Screen name="QRCodeReader" component={QRCodeReaderScreen} options={{headerShown: false}}></Tab.Screen>
                                        <Tab.Screen name="Account" component={AccountNavigator} options={{headerShown: false}}></Tab.Screen>
                                    </Tab.Group>);
                        case 'ServiceProvider':
                            console.log('Service Provider Screens loading')
                            return (<Tab.Group>
                                        <Tab.Screen name="Home" component={ServiceProviderHomeNavigator} options={{headerShown: false}}></Tab.Screen>
                                        <Tab.Screen name="Account" component={AccountNavigator} options={{headerShown: false}}></Tab.Screen>
                                    </Tab.Group>);
                        // Temporary fix. Default case shouldn't occur.
                        default:
                            console.log('Error. Account Type not found')
                            return (<Tab.Group>
                                <Tab.Screen name="Home" component={HomeNavigator} options={{headerShown: false}}></Tab.Screen>
                                <Tab.Screen name="Account" component={AccountNavigator} options={{headerShown: false}}></Tab.Screen>
                            </Tab.Group>);
                    }
                })()
            }
                      
        </Tab.Navigator>
    )
}

export default AppNavigator;
