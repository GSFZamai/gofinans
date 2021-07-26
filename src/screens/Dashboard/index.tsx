import React from 'react';

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
} from './styles';

export interface TransactionCardData extends TransactionData {
    id: string;
}

export function Dashboard() {
    const data: TransactionCardData[] = [
        {
            id: '1',
            type: 'income',
            title: 'Desenvolvimento de site',
            amount: 'R$ 12.000,00',
            category: {
                icon: 'dollar-sign',
                name: "Vendas"
            },
            date: '13/04/2020'
        },
        {
            id: '2',
            type: 'outcome',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            category: {
                icon: 'coffee',
                name: "Alimentação"
            },
            date: '10/04/2020'
        },
        {
            id: '3',
            type: 'outcome',
            title: 'Aluguel Casa',
            amount: 'R$ 1.200,00',
            category: {
                icon: 'home',
                name: "Casa"
            },
            date: '27/03/2020'
        },
    ]
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/47357785?v=4'
                            }}
                        />
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
            
            <ResumeCards>
                <ResumeCard 
                    type="income"
                    transaction="Entrada"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <ResumeCard 
                    type="outcome"
                    transaction="Saída"
                    amount="R$ 1.600,00"
                    lastTransaction="Última saída dia 01 de abril"
                />
                <ResumeCard 
                    type="total"
                    transaction="Total"
                    amount="R$ 11.400,00"
                    lastTransaction="01 à 16 de abril"
                />
            </ResumeCards>
            
            <Transactions>
                <Title>Transações</Title>

                <TransactionsList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={
                        ({item}) => <TransactionCard data={item} />
                    }
                />
            </Transactions>
                
        </Container>
    )
}
