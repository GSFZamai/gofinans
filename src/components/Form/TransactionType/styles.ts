import styled, { css } from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
    type: 'income' | 'outcome';
    isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border: 1px solid ${({theme}) => theme.colors.text};
    border-radius: 5px;
    background-color: ${({theme}) => theme.colors.background };

    ${({type, isActive}) => type === 'income' && isActive && css`
       background-color: ${({theme}) => theme.colors.success_light };
       border: none;
    `};

    ${({type, isActive}) => type === 'outcome' && isActive && css`
       background-color: ${({theme}) => theme.colors.attention_light };
       border: none;
    `};
`;

export const Title = styled(Text)<ButtonProps>`
    color: ${({theme, isActive}) => isActive ? theme.colors.default : theme.colors.text };
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    margin-left: 14px;

`;

export const Icon = styled(Feather)<ButtonProps>`
    font-size: ${RFValue(24)}px;
    color: ${({theme, type}) => type === 'income' ? theme.colors.success_light : theme.colors.attention_light };

    ${({type, isActive}) => type === 'income' && isActive && css`
      color: ${({theme}) => theme.colors.success };
    `};

    ${({type, isActive}) => type === 'outcome' && isActive && css`
        color: ${({theme}) => theme.colors.attention };  
    `};
`;
