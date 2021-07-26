import React, {useEffect, useState} from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Form/Button';
import { CategorySelect } from '../../screens/CategorySelect';
import { CategorySelectField } from '../../components/Form/CategorySelectField';
import { TransactionType } from '../../components/Form/TransactionType';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypeContainer
} from './styles';
import { FormControlled } from '../../components/Form/FormControlled';
import { Alert } from 'react-native';

interface FormData {
    name: string;
    value: string;
}

const scheme = yup.object().shape({
    name: yup
        .string()
        .required('Nome é um campo obrigatório'),
    value: yup
        .number()
        .typeError('Valor é um campo numérico')
        .required('Valor é um campo obrigatório')
        .positive('Insira um valor positivo')
})

export function Registro() {
    const dataKey = '@gofinances:transactions'
    const [transactionType, setTransactionType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState({
        name: 'Categoria',
        key: ''
    })
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(scheme)
    })

    function handleTransactionTypeSelect(type: string) {
        setTransactionType(type);
    }

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    async function handleFormSubmit(form: FormData) {
        if (!transactionType) {
            return Alert.alert('Selecione um tipo de transação');
        }

        if (!category.key) {
            return Alert.alert('Selecione uma categoria!');
        }

        const data = {
            name: form.name,
            value: form.value,
            category: category.key,
            transaction: transactionType
        }


        try {
            await AsyncStorage.setItem(dataKey, JSON.stringify(data));
        }catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel realizar o registro no momento');
        }

    }

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(dataKey)
            console.log(data);
        }

        loadData();
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>

                <Header>
                    <Title>Cadastro</Title>
                </Header>



                <Form>
                    <Fields>
                        <FormControlled
                            name='name'
                            control={control}
                            placeholder="Nome"
                            error={errors.name && errors.name.message}
                            autoCorrect={false}

                        />
                        <FormControlled
                            name='value'
                            control={control}
                            placeholder="Preço"
                            error={errors.value && errors.value.message}
                            keyboardType='numeric'
                        />
                        <TransactionTypeContainer>
                            <TransactionType
                                type='income'
                                transaction="Income"
                                isActive={transactionType === 'income'}
                                onPress={() => handleTransactionTypeSelect('income')}
                            />

                            <TransactionType
                                type='outcome'
                                transaction="Outcome"
                                isActive={transactionType === 'outcome'}
                                onPress={() => handleTransactionTypeSelect('outcome')}
                            />
                        </TransactionTypeContainer>
                        <CategorySelectField
                            title={category.name}
                            onPress={handleOpenModal}
                        />
                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleFormSubmit)}
                    />

                    <Modal visible={isModalOpen}>
                        <CategorySelect
                            setCategory={setCategory}
                            handleCloseModal={handleCloseModal}
                            category={category}
                        />
                    </Modal>

                </Form>

            </Container>
        </TouchableWithoutFeedback>
    )
}