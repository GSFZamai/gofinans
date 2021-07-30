import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
    Container,
    ImgContainer,
    Title
} from './styles'

interface SignInButtonProps extends RectButtonProps {
    text: string;
    svg: React.FC<SvgProps>;
}

export function SignInButton({text, svg: Svg, ...rest}: SignInButtonProps) {
    return(
        <Container {...rest}>
            <ImgContainer>
                <Svg />
            </ImgContainer>
            <Title>{text}</Title>
        </Container>
    );
}