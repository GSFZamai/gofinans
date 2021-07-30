import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import Logo from '../../assets/logo.svg';
import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import { SignInButton } from '../../components/SignInButton';
import { useAuth } from '../../hooks/auth';


import {    
    Container,
    Header,
    LogoContainer,
    Slogan,
    LoginText,
    Footer,
    LoginButtonsContainer
} from './styles'


export function SignIn() {
    const {signInWithGoogle, signInWithApple} = useAuth();
    const [awaitLogin, setAwaitLogin] = useState(false);
    const theme = useTheme();
    
    async function handleSignInWithGoogle() {
        try {
            setAwaitLogin(true);
            return await signInWithGoogle();
        }catch (error) {
            console.log(error);
            Alert.alert('Não foi possível realizar a conexão no momento!')
            setAwaitLogin(false); 
        }
        
    }

    async function handleSignInWithApple() {
        try {
            setAwaitLogin(true); 
            return await signInWithApple();
        }catch (error) {
            console.log(error);
            Alert.alert('Não foi possível realizar a conexão no momento!')
            setAwaitLogin(false); 
        }
        
        
    }

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
                <LoginButtonsContainer>
                    <SignInButton 
                        text='Entrar com Google'
                        svg={GoogleIcon}
                        onPress={handleSignInWithGoogle}
                    />

                    {
                        Platform.OS === 'ios' &&
                        <SignInButton 
                            text='Entrar com Apple'
                            svg={AppleIcon}
                            onPress={handleSignInWithApple}
                        />
                    }
                </LoginButtonsContainer>

                {
                    awaitLogin && 
                    <ActivityIndicator
                        size='small'
                        color={theme.colors.shape}
                    /> 
                 }
                
            </Footer>
        </Container>
    )
}