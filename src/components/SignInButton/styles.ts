import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    height: ${RFValue(56)}px;
    flex-direction: row;
   
    background-color: ${({theme}) => theme.colors.shape};
    align-items: center;
    border-radius: 5px;
    margin-bottom: 16px;
`;

export const ImgContainer = styled.View`
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme}) => theme.colors.background};
    border-right-width: 1px;
`;

export const Title = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;
