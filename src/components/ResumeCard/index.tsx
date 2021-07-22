import React from 'react';
import {
    Container,
    Header,
    Transaction,
    Icon,
    Content,
    Value,
    LastTransaction,
} from './styles';

interface ResumeCardProps {
    type: 'income' | 'outcome' | 'total';
    transaction: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    income: 'arrow-up-circle',
    outcome: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function ResumeCard({type, transaction, amount, lastTransaction}: ResumeCardProps) {
    return(
        <Container type={type}>
            <Header>
                <Transaction type={type}>{transaction}</Transaction>
                <Icon name={icon[type]} type={type}></Icon>
            </Header>
            <Content>
                <Value type={type}>{amount}</Value>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Content>
        </Container>
    )
}