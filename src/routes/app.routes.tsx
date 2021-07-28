import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';


import { Dashboard } from '../screens/Dashboard';
import { Registro } from '../screens/Registro';
import { Chart } from '../screens/Chart';

const { Navigator, Screen } = createBottomTabNavigator();


export function AppRoutes() {
    const theme = useTheme();
    return(
        <Navigator
            tabBarOptions={
                {
                    labelPosition: 'beside-icon',
                    activeTintColor: theme.colors.secondary,
                    inactiveTintColor: theme.colors.text,
                    style: {
                        height: 80,
                        paddingVertical: Platform.OS === 'ios' ? 20 : 0
                    }
                }
            }
        >
            <Screen 
                name="Extrato"
                component={Dashboard}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name="format-list-bulleted"
                            color={color}
                            size={size}
                        />
                    ))
                }}
            />

            <Screen 
                name="Cadastrar"
                component={Registro}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name="attach-money"
                            color={color}
                            size={size}
                        />
                    ))
                }}
            />

            <Screen 
                name="Resumo"
                component={Chart}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name="pie-chart"
                            color={color}
                            size={size}
                        />
                    ))
                }}
            />
        </Navigator>
    )
}