import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    background: ${({ theme }) => theme.colors.shape};
    width: ${RFValue(300)}px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    border-radius: 5px;
    margin-right: 16px;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const Transaction = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.default};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.success};
    font-size: ${RFValue(40)}px;
`;

export const Content = styled.View`
    margin-top: 50px;
`;

export const Value = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.default};
    font-size: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(12)}px;
`;
