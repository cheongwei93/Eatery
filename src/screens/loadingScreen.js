import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ActivityIndicator } from 'react-native';
import logo from '../../images/logo/logo.png';



class loadingScreen extends Component {

    constructor(props){
        super(props);
        
    }

    state={
        Logo: new Animated.Value(0),
        loadingSpinner: false
    }

    componentDidMount(){
        const{Logo} = this.state;
        
        Animated.parallel([
            Animated.spring(Logo,{
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
                useNativeDriver: false
            }).start()

            
        ]).start(()=> {
            this.setState({
                loadingSpinner: true
            });

            setTimeout(()=>this.props.navigation.navigate('login2'), 2000)
        })
    }

    render(){
        return(

            <View style={styles.container}>
                <Animated.View style={{
                    opacity: this.state.Logo,
                    top: this.state.Logo.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0]
                    })
                }}>
                    <Image source={logo} />
                    {this.state.loadingSpinner ? <ActivityIndicator style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    size="large"
                    color="white"
                    
                    /> : null}
                </Animated.View>
                
            </View>
        );
    }

   
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});



export default loadingScreen;