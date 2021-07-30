import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { ResumeCard } from '../../components/ResumeCard';
import { TransactionCard, TransactionData } from '../../components/TransactionCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Button,
    FeatherIcons,
    ResumeCards,
    Transactions,
    Title,
    TransactionsList,
    LoaderContainer,
    WarningContainer,
    Warning
} from './styles';
import { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';

export interface TransactionCardData extends TransactionData {
    id: string;
}

interface TransactionsSum {
    sum: string;
    lastTransaction: string;
}

interface ResumeProps {
    income: TransactionsSum,
    outcome: TransactionsSum,
    total: TransactionsSum,
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<TransactionCardData[]>([]);
    const [resumeData, setResumeData] = useState<ResumeProps>({} as ResumeProps);
    const [resetCounter, setResetCounter] = useState(0);
    
    const { user, logOut } = useAuth();
    const theme = useTheme();

    function resetData() {


        if (resetCounter >= 20) {
            const resetDataKeys = [`@gofinances:transactions_user:${user.id}`, '@gofinances:user'];
            AsyncStorage.multiRemove(resetDataKeys);
            console.log('Feito!')
            setResetCounter(0);
            return;
        } else {
            if (resetCounter === 15) {
                Alert.alert('Só mais um pouquinho!');
            }
            setResetCounter(resetCounter + 1);
            console.log(resetCounter);
        }
    }

    function getLastTransactions(
        transactions: TransactionCardData[],
        transactionType: 'income' | 'outcome' | 'resume'
    ): string {
        const auxiliar = {
            income: 'entrada',
            outcome: 'saída',
            resume: ''
        }

        let lastTransactionMessage = `Não existem transações de ${auxiliar[transactionType]} para o período.`

        if (transactionType === 'resume') {
            try{

                const lastTransactionTimestamp = Math.max.apply(Math,
                    transactions
                        .map(
                            transaction => new Date(transaction.date).getTime()
                        )
                );
    
                const lastTransactionDate = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                }).format(new Date(lastTransactionTimestamp))
    
                lastTransactionMessage = `Última transação realizada dia ${lastTransactionDate}.`
    
            } catch (error) {
                console.log(`Sem transações de ${auxiliar[transactionType]}`);
            }

            return lastTransactionMessage;
        }

        try{

            const lastTransactionTimestamp = Math.max.apply(Math,
                transactions
                    .filter(
                        item => item.transaction === transactionType
                    )
                    .map(
                        transaction => new Date(transaction.date).getTime()
                    )
            );

            const lastTransactionDate = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'long',
            }).format(new Date(lastTransactionTimestamp))

            lastTransactionMessage = `Última ${auxiliar[transactionType]} dia ${lastTransactionDate}`

        } catch (error) {
            console.log(`Sem transações de ${auxiliar[transactionType]}`);
        }

        return lastTransactionMessage;

    }

    async function loadData() {
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const storedData = response ? JSON.parse(response!) : [];

        if (storedData.length === 0) {
            setData(storedData);
            setIsLoading(false);
            return;
        }

        let incomes = 0;
        let outcomes = 0;

        const fomatedData = storedData.map((transaction: TransactionCardData) => {

            if (transaction.transaction === 'income') {
                incomes += Number(transaction.value);
            } else {
                outcomes += Number(transaction.value);
            }

            const value = Number(transaction.value).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(transaction.date))


            return {
                id: transaction.id,
                transaction: transaction.transaction,
                name: transaction.name,
                value,
                category: transaction.category,
                date
            }
        })



        const total = (incomes - outcomes).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        setResumeData({
            income: {
                sum: incomes.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: getLastTransactions(storedData, 'income')
            },
            outcome: {
                sum: outcomes.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: getLastTransactions(storedData, 'outcome')
            },
            total: {
                sum: total,
                lastTransaction: getLastTransactions(storedData, 'resume')
            },
        });

        setData(fomatedData);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData()
    }, []));

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Button onPress={resetData}>
                            <Photo
                                source={{
                                    uri: user.photo
                                }}
                            />
                        </Button>
                        <User>
                            <UserGreeting>
                                Olá,
                            </UserGreeting>
                            <UserName>
                                {user.name}
                            </UserName>
                        </User>
                    </UserInfo>
                    <Button onPress={logOut}>
                        <FeatherIcons name="power" />
                    </Button>
                </UserWrapper>
            </Header>

            {
                isLoading

                    ?

                    <LoaderContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoaderContainer>

                    :


                    data.length === 0

                        ?

                        <WarningContainer>
                            <Warning>Nenhuma Transação Cadastrada</Warning>

                        </WarningContainer>

                        :


                        <>

                            <ResumeCards>
                                <ResumeCard
                                    type="income"
                                    transaction="Entrada"
                                    amount={resumeData.income.sum}
                                    lastTransaction={resumeData.income.lastTransaction}
                                />
                                <ResumeCard
                                    type="outcome"
                                    transaction="Saída"
                                    amount={resumeData.outcome.sum}
                                    lastTransaction={resumeData.outcome.lastTransaction}
                                />
                                <ResumeCard
                                    type="total"
                                    transaction="Total"
                                    amount={resumeData.total.sum}
                                    lastTransaction={resumeData.total.lastTransaction}
                                />
                            </ResumeCards>

                            <Transactions>
                                <Title>Transações</Title>

                                <TransactionsList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={
                                        ({ item }) => <TransactionCard data={item} />
                                    }
                                />
                            </Transactions>
                        </>
            }
        </Container>
    )
}
