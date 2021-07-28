import React from 'react';
import { categories } from '../../utils/categories';
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

export interface TransactionData {
    transaction: 'income' | 'outcome';
    name: string;
    value: string;
    category: string;
    date: string;
}

interface TransactionProps {
    data: TransactionData;
}

export function TransactionCard({data}: TransactionProps) {
    const [category] = categories.filter(
        (item) => item.key === data.category
    );

    return(
        <Container>
            <Title>
                {data.name}
            </Title>

            <Amount type={data.transaction}>
                {data.transaction === "outcome" && '- '}
                {data.value}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>
                        {category.name}
                    </CategoryName>
                </Category>
                <Date>
                    {data.date}
                </Date>
            </Footer>
        </Container>
    )
}