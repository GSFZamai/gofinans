import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';
import {
    Container,
    Header,
    Footer,
    Title,
    Category,
    Icon,
    CategoryName,
    ItemSeparator,
} from './styles';

interface Category {
    name: string;
    key: string;
}

interface CategorySelectProps {
    category: Category;
    setCategory: (category: Category) => void;
    handleCloseModal: () => void;
}

export function CategorySelect({ category, setCategory, handleCloseModal }: CategorySelectProps) {

    function handleSetCategoria(name: string, key: string) {
        setCategory({ name, key })
    }

    return (
        <Container>
            <Header>
                <Title>
                    Categorias
                </Title>
            </Header>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={() => <ItemSeparator />}
                renderItem={({ item }) => {

                    return (
                        <Category
                            onPress={() => handleSetCategoria(item.name, item.key)}
                            isActive={category.key === item.key}
                        >
                            <Icon name={item.icon} />
                            <CategoryName>
                                {item.name}
                            </CategoryName>
                        </Category>
                    )

                }
                }
            />
            <Footer>
                <Button onPress={handleCloseModal} title="Selecionar" />
            </Footer>
        </Container>
    )
}