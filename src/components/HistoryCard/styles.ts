import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface HistoryCardContainerProps {
    color: string;
}

export const Container = styled.View<HistoryCardContainerProps>`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 13px 24px;
    border-left-width: 5px;
    border-left-color: ${({color}) => color};
    margin-bottom: 10px;
`;

export const Category = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`;
export const Value = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;