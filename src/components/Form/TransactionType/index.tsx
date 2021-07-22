import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Title,
    Icon
} from './styles';

interface TransactionTypeProps extends TouchableOpacityProps {
    type: "income" | "outcome",
    transaction: string;
    isActive: boolean;
}

const icon = {
    income: 'arrow-up-circle', 
    outcome: 'arrow-down-circle'
}

export function TransactionType({type, transaction, isActive, ...rest}: TransactionTypeProps) {
    return(
        <Container isActive={isActive}  type={type} {...rest}>
            <Icon isActive={isActive} type={type} name={icon[type]} />
            <Title isActive={isActive} type={type}>{transaction}</Title>
        </Container>
    )
}