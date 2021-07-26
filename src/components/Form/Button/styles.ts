import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    align-items: center;
    padding: 18px;
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(14)}px;
`;