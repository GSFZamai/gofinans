import React from 'react';
import { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionType } from '../../components/Form/TransactionType';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypeContainer
} from './styles';

export function Registro() {
    const [isActive, setIsActive] = useState('');

    function handleTransactionTypeSelect(type: string) {
        setIsActive(type);
    }

    return(
        <Container>

            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Valor" />
                    <TransactionTypeContainer>
                        <TransactionType 
                            type='income' 
                            transaction="Income"
                            isActive={isActive === 'income'}
                            onPress={() => handleTransactionTypeSelect('income')}
                        />

                        <TransactionType 
                            type='outcome' 
                            transaction="Outcome"
                            isActive={isActive === 'outcome'}
                            onPress={() => handleTransactionTypeSelect('outcome')}
                        />
                    </TransactionTypeContainer>
                </Fields>
                <Button title="Enviar"/> 
            </Form>
        </Container>
    )
}