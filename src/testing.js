import * as React from 'react';
import { Text, View } from 'react-native';
import Carousel from '@khanshamshad32/carousel';

import pic1 from '../images/Sushi/001.jpg';
import pic2 from '../images/Sushi/002.jpg';
import pic3 from '../images/Sushi/003.jpg';
import pic4 from '../images/Sushi/004.jpg';
import pic5 from '../images/Sushi/005.jpg';

const dataSource = [
  {url: pic1, color: '#FE0404'},
  {url: pic2, color: '#522A73'},
  {url: pic3, color: '#008200'},
  {url: pic4, color: '#034223'},
  {url: pic5, color: '#015280'},
];

class testing extends Component{
  render(){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <Carousel
         dataSource={dataSource}
         onItemPress={item => {
           console.log(item);
         }}
         containerDim={{height: 200, width: 350}}
         itemDim={{width: 100, height: 110}}
         radius={100}
         />
      </View>
    );
  }
}

export default testing;


