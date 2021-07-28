import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import {    
    Container,
    Header,
    LogoContainer,
    Slogan,
    LoginText,
    Footer,
} from './styles'

export function SignIn() {
    return(
        <Container>
            <Header>
                <LogoContainer>
                    <Logo 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Slogan>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Slogan>
                </LogoContainer>
                <LoginText>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </LoginText>
            </Header>
            <Footer>

            </Footer>
        </Container>
    )
}