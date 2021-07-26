import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    width: 100%;

`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: ${RFValue(113)}px;
    padding-bottom: ${RFValue(18)}px;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;
    justify-content: space-between;
`;

export const Fields = styled.View`
`;

export const TransactionTypeContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin: 8px 0 16px 0;
`;
