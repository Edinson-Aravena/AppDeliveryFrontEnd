import React from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import useViewModel from './ViewModel'
import { RolesItem } from './Item';


export const RolesScreen= () => {

    const { user } = useViewModel();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    

    return (
        <View>
            <FlatList
                data={user?.roles}
                renderItem={({item}) =><RolesItem rol={item} height={420} width={width}/>}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default RolesScreen;