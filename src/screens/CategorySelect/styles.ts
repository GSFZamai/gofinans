import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    width: 100%;    
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
`;

export const Title = styled.Text`
    margin-bottom: 16px;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    flex-direction: row;
    background-color: ${({theme, isActive}) => isActive ? theme.colors.secondary_light : theme.colors.shape};
    align-items: center;
    padding: 24px;
`;

export const Icon = styled(Feather)`
    margin-right: 10px;
    font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;


export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;

export const ItemSeparator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.default}
`
