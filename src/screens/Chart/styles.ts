import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";
import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: ${RFValue(113)}px;
    padding-bottom: ${RFValue(18)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView`

`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const HistoryList = styled.ScrollView`
    padding: 24px;
`;

export const MonthSelector = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 24px;
    margin-top: 24px;
    align-items: center;
`;

export const MonthSelectorButton = styled(BorderlessButton)`
    align-items: center;
    justify-content: center;
`;

export const MonthSelectorButtonIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const ActivityIndicatorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const WarningContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Warning = styled.Text`

`;
