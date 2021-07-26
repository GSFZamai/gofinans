import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Title,
    Icon,
    Button
} from './styles';

interface TransactionTypeProps extends RectButtonProps {
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
        <Container isActive={isActive}  type={type}>
            <Button {...rest}>
                <Icon isActive={isActive} type={type} name={icon[type]} />
                <Title isActive={isActive} type={type}>{transaction}</Title>
            </Button>
        </Container>
    )
}