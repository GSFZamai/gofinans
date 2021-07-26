import styled from "styled-components/native";
import { BorderlessButton } from 'react-native-gesture-handler' 
import {Feather} from '@expo/vector-icons'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from "react-native";

import {TransactionCardData} from '.'


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-start;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
`;

export const UserName = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
`;

export const Button = styled(BorderlessButton)``;

export const FeatherIcons = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.secondary};
`;

export const ResumeCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24},
})`
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(16)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const TransactionsList = styled(
    FlatList as new () => FlatList<TransactionCardData>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {paddingBottom: 20}
})`

`;