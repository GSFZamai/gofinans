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

export function TransactionCard() {
    return(
        <Container>
            <Header>
                <Transaction>Entrada</Transaction>
                <Icon name="arrow-up-circle"></Icon>
            </Header>
            <Content>
                <Value>R$ 17.400,00</Value>
                <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
            </Content>
        </Container>
    )
}