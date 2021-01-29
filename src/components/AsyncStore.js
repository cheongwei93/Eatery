import AsyncStorage from '@react-native-community/async-storage';

const store = async function(result){
    try {
        
        //check first
        let value = await AsyncStorage.getItem("key");
        if(value === result){
            console.log("Same key");
            return;
        }else{
            console.log("Not same");
            AsyncStorage.setItem('key', result);
        }

        
    } catch (error) {
        throw error;
    }
}

export default store;