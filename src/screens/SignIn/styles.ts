import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`

export const LogoContainer = styled.View`
    align-items: center;
`;

export const Slogan = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
`;

export const LoginText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.secondary};
`;