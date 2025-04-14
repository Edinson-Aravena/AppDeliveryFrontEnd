import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { RootStackParamList } from './StackNavigator';
import { Category } from '../../domain/entities/Category';
import { CategoryProvider } from '../context/CategoryContext';
import { RestaurantCategoryCreateScreen } from '../screens/restaurante/category/create/CategoryCreate';
import { RestaurantCategoryUpdateScreen } from '../screens/restaurante/category/update/CategoryUpdate';
import { RestaurantCategoryListScreen } from '../screens/restaurante/category/list/CategoryList';
import { IconComponent } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalColors } from '../theme/GlobalTheme';

export type CategoryStackParamList = {
  RestaurantCategoryListScreen: undefined,
  RestaurantCategoryCreateScreen: undefined,
  RestaurantCategoryUpdateScreen: { category: Category },
}
const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const RestaurantCategoryNavigator = () => {
  return (
    <CategoryState>
      <Stack.Navigator
        screenOptions={
          {
            headerShown: false,
          }
        }
      >
        <Stack.Screen
          name="RestaurantCategoryListScreen"
          component={RestaurantCategoryListScreen}
          options={ ({ route, navigation }) => ({
            title: 'Categorias',
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('RestaurantCategoryCreateScreen')}
                style={{
                  marginRight: 10,
                }}
              >
                <IconComponent icon="add-circle-outline" color={globalColors.buttons} size={26} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="RestaurantCategoryCreateScreen"
          component={RestaurantCategoryCreateScreen}
          options={{
            headerShown: true,
            title: 'Nueva Categoria',
          }}
        />
        <Stack.Screen
          name="RestaurantCategoryUpdateScreen"
          component={RestaurantCategoryUpdateScreen}
          options={{
            headerShown: true,
            title: 'Editar Categoria',
          }}
        />
      </Stack.Navigator>
    </CategoryState>
  )
}

const CategoryState = ({ children }: any) => {
  return (
    <CategoryProvider>
      {children}
    </CategoryProvider>
  )
}