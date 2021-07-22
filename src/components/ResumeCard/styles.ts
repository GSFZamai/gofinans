import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { color } from 'react-native-reanimated';

interface TransactionTypeProps {
    type: "income" | "outcome" | "total";
}

export const Container = styled.View<TransactionTypeProps>`
    background-color: ${({ theme, type }) =>
        type === "total" ? theme.colors.secondary : theme.colors.shape
    };
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

export const Transaction = styled.Text<TransactionTypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme, type }) =>
        type === "total" ? theme.colors.shape : theme.colors.default
    };
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather) <TransactionTypeProps>`
    font-size: ${RFValue(40)}px;

    ${({type}) => type === "income" && css`
        color: ${({theme}) => theme.colors.success}
    `}

    ${({type}) => type === "outcome" && css`
        color: ${({theme}) => theme.colors.attention}
    `}

    ${({type}) => type === "total" && css`
        color: ${({theme}) => theme.colors.shape}
    `}
`;

export const Content = styled.View`
    margin-top: 50px;
`;

export const Value = styled.Text<TransactionTypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${
        ({ theme, type }) => 
        type === "total" ? theme.colors.shape : theme.colors.default
    };
    font-size: ${RFValue(32)}px;
`;

export const LastTransaction = styled.Text<TransactionTypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${
        ({ theme, type }) => 
        type === "total" ? theme.colors.shape : theme.colors.text
    };
    font-size: ${RFValue(12)}px;
`;
