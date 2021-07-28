import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';

import { HistoryCard } from '../../components/HistoryCard';
import {
    Container,
    Header,
    Title,
    HistoryList,
    ChartContainer,
    Content,
    MonthSelector,
    MonthSelectorButton,
    MonthSelectorButtonIcon,
    Month,
    ActivityIndicatorContainer,
    Warning,
    WarningContainer
} from './styles';
import { categories } from '../../utils/categories';


interface TransactionsProps {
    category: string;
    date: string;
    id: string;
    name: string;
    transaction: 'income' | 'outcome';
    value: number;
}

interface OutcomeHistoryProps {
    category: string;
    formatedTotal: string;
    total: number;
    color: string;
    key: string;
    percent: string;
}

export function Chart() {
    const [isLoading, setIsLoading] = useState(true);
    const [listData, setListData] = useState<OutcomeHistoryProps[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const category = categories;
    const theme = useTheme();

    function handleChangedate(action: 'next' | 'prev') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
            setIsLoading(true);
        }

        if (action === 'prev') {
            setSelectedDate(subMonths(selectedDate, 1));
            setIsLoading(true);
        }
    }

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const rawData = await AsyncStorage.getItem(dataKey);
        const transactions: TransactionsProps[] = rawData ? JSON.parse(rawData!) : []
        const outcomeTransactions = transactions.filter(item => (
            (item.transaction === 'outcome') &&
            (selectedDate.getFullYear() === new Date(item.date).getFullYear()) &&
            (selectedDate.getMonth() === new Date(item.date).getMonth())
        ));
        const outcomeHistory: OutcomeHistoryProps[] = [];
        const outcomeTotal = outcomeTransactions.reduce((acc, transaction) => {
            return acc += transaction.value;
        }, 0);

        category.forEach(item => {
            let categoryTotal = 0;

            outcomeTransactions.forEach((transaction: TransactionsProps) => {
                if (transaction.category === item.key) {
                    categoryTotal += transaction.value;
                }
            })

            if (categoryTotal > 0) {
                outcomeHistory.push(
                    {
                        category: item.name,
                        formatedTotal: categoryTotal.toLocaleString('pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }
                        ),
                        total: categoryTotal,
                        color: item.color,
                        key: item.key,
                        percent: `${((categoryTotal / outcomeTotal) * 100).toFixed(0)}%`
                    }
                )
            }

        })

        setListData(outcomeHistory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData()
    }, [selectedDate]));

    return (
        <Container>
            <Header>

                <Title>Resumo por categoria</Title>
            </Header>



            <Content
                showsVerticalScrollIndicator={false}
                style={
                    {
                        paddingBottom: useBottomTabBarHeight()
                    }
                }
            >

                <MonthSelector>

                    <MonthSelectorButton onPress={() => handleChangedate('prev')}>
                        <MonthSelectorButtonIcon name="chevron-left" />
                    </MonthSelectorButton>

                    <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                    <MonthSelectorButton onPress={() => handleChangedate('next')}>
                        <MonthSelectorButtonIcon name="chevron-right" />
                    </MonthSelectorButton>

                </MonthSelector>

                {
                    isLoading

                        ?

                        <ActivityIndicatorContainer>
                            <ActivityIndicator
                                color={theme.colors.primary}
                                size='large'
                            />
                        </ActivityIndicatorContainer>

                        :



                        (listData.length === 0)

                            ?
                            <WarningContainer>
                                <Warning>
                                    Nenhuma transação para o mês de {format(selectedDate, 'MMMM', { locale: ptBR })}
                                </Warning>
                            </WarningContainer>

                            :

                            <>
                                <ChartContainer>
                                    <VictoryPie
                                        data={listData}
                                        colorScale={listData.map(item => item.color)}
                                        labelRadius={80}
                                        style={
                                            {
                                                labels: {
                                                    fontSize: RFValue(18),
                                                    fill: theme.colors.shape,
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        }
                                        x="percent"
                                        y="total"
                                    />
                                </ChartContainer>
                                <HistoryList showsVerticalScrollIndicator={false}>
                                    {
                                        listData.map(item => (
                                            <HistoryCard
                                                key={item.key}
                                                color={item.color}
                                                category={item.category}
                                                value={item.formatedTotal}
                                            />
                                        ))
                                    }
                                </HistoryList>
                            </>
                }
            </Content>
        </Container>
    )
}