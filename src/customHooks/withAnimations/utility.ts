import { Animated } from "react-native";

export const getInterpolation = (animation: Animated.Value, outPutRange: [string, string]) => {
    return animation.interpolate({
        inputRange: [0, 1],
        outputRange: outPutRange,
    });
}