import React from 'react';

import {
    Container,
    Title,
    Icon
} from './styles'

interface CategorySelectFieldProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectField({ title, onPress }: CategorySelectFieldProps) {
    return (
        <Container onPress={onPress}>
            <Title>
                {title}
            </Title>
            <Icon name="chevron-down" />
        </Container>
    )
}