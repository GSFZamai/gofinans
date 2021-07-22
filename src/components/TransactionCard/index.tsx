import React from 'react';
import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';


interface Category {
    icon: string;
    name: string;
}

export interface TransactionData {
    type: 'income' | 'outcome';
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface TransactionProps {
    data: TransactionData;
}

export function TransactionCard({data}: TransactionProps) {
    return(
        <Container>
            <Title>
                {data.title}
            </Title>

            <Amount type={data.type}>
                {data.type === "outcome" && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>
                        {data.category.name}
                    </CategoryName>
                </Category>
                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}