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

    const theme = useTheme();

    function resetData() {


        if (resetCounter >= 20) {
            const dataKey = '@gofinances:transactions';
            AsyncStorage.removeItem(dataKey);
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
        transactionType: 'income' | 'outcome'
    ): string {

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


        return lastTransactionDate;

    }

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const storedData = response ? JSON.parse(response!) : [];

        console.log(storedData);

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
                lastTransaction: `Última entrada dia ${getLastTransactions(storedData, 'income')}`
            },
            outcome: {
                sum: outcomes.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${getLastTransactions(storedData, 'income')}`
            },
            total: {
                sum: total,
                lastTransaction: `01 à ${getLastTransactions(storedData, 'income')}`
            },
        });

        setData(fomatedData);
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

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
                                    uri: 'https://avatars.githubusercontent.com/u/47357785?v=4'
                                }}
                            />
                        </Button>
                        <User>
                            <UserGreeting>
                                Olá,
                            </UserGreeting>
                            <UserName>
                                Gabriel
                            </UserName>
                        </User>
                    </UserInfo>
                    <Button>
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
