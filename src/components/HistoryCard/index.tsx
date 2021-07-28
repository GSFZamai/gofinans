import React from 'react';

interface HistoryCardProps {
    category: string;
    value: string;
    color: string;
}

import {
    Container,
    Category,
    Value
} from './styles'

export function HistoryCard({category, value, color}: HistoryCardProps) {
    return (
        <Container color={color}>
            <Category>{category}</Category>
            <Value>{value}</Value>
        </Container>
    )
}