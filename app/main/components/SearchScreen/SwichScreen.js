import React,{ useState } from 'react';
import { View,Text } from 'react-native';
import ResponseScreen from './ResponseScreen';
import SearchScreen from './SearchScreen';

const SwitchScreen = () => {
    const [showResponse,setShowResponse] = useState

    const closePopup = () => {
        setTimeout(() => setShowSearch(false),1) 
    }
    return(
        <View>
            {showResponse ? <ResponseScreen/> : <SearchScreen closePopup={closePopup} textSearch = {text} popup={true}/>}
        </View>
    )
}
export default SwitchScreen