import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import reanimated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TextInput } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';

import bgImage from '../../images/background/marie-g-Rx6bd1lS4Es-unsplash.jpg';
import logo from '../../images/logo/logo.png';

const { width, height } = Dimensions.get('window');
const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = reanimated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class homepage extends Component {
    constructor() {
        super()
        this.buttonOpacity = new Value(1);
        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([cond(eq(state, State.END), set(this.buttonOpacity,
                        runTiming(new Clock(), 1, 0)))
                    ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([cond(eq(state, State.END), set(this.buttonOpacity,
                        runTiming(new Clock(), 0, 1)))
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    };

    render() {
        return (

            <View style={styles.container}>
                <reanimated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                    <Svg height={height + 50} width={width}>
                        <ClipPath id="clip">
                            <Circle r={height + 50} cx={width / 2} />
                        </ClipPath>
                        <Image
                            href={bgImage}
                            width={width}
                            height={height + 50}
                            preserveAspectRatio='xMidYMid slice'
                            ClipPath="url(#clip)"
                        />
                    </Svg>

                </reanimated.View>

                <View style={styles.content}>

                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <reanimated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                            <   Text style={styles.buttonText}>LOGIN</Text>
                        </reanimated.View>
                    </TapGestureHandler>

                    <reanimated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </reanimated.View>

                    <reanimated.View style={{
                        zIndex: this.textInputZindex,
                        opacity: this.textInputOpacity,
                        transform: [{ translateY: this.textInputY }],
                        height: height / 3,
                        ...StyleSheet.absoluteFill,
                        top: null,
                        justifyContent: 'center'
                    }}>

                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <reanimated.View style={styles.closeButton}>
                                <reanimated.Text style={{ fontSize: 15, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                                    X
                                </reanimated.Text>
                            </reanimated.View>
                        </TapGestureHandler>

                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            placeholderTextColor='black'
                        />

                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            placeholderTextColor='black'
                        />

                        <reanimated.View style={styles.button}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Sign In
                            </Text>
                        </reanimated.View>
                    </reanimated.View>

                </View>

            </View>



        );
    }

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: null,
        width: null
    },
    logo: {
        width: 200,
        height: 200,
        alignItems: 'center'

    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowOffset: { width: 2, heigh: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    content: {
        height: height / 3,
        justifyContent: 'center'
    },
    input: {
        height: 50,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 0.5
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: { width: 2, heigh: 2 },
        shadowColor: '#000000',
        shadowOpacity: 0.2
    }
});

export default homepage;

// #FF6347
// #FA4B3E

