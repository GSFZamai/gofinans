import React from 'react';
import { TransactionCard } from '../../components/TransactionCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    FeatherIcons,
    TransactionCards
} from './styles';

export function Dashboard() {
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
                    <FeatherIcons name="power" />
                </UserWrapper>
            </Header>
            
            <TransactionCards>
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
            </TransactionCards>
        </Container>
    )
}
