import AsyncStorage from '@react-native-community/async-storage';

const retrieve = async function(){
    try {
        let result = await AsyncStorage.getItem('key');
        result = parseInt(result);
        return result;
    } catch (error) {
        throw error;
    }
}

export default retrieve;