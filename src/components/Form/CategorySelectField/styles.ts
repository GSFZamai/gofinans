import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.7
})`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme}) => theme.colors.shape};
    padding: 18px 8px 18px 17px;
    border-radius: 5px;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(20)}px;
`;

