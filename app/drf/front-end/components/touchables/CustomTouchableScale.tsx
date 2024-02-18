import { PropsWithChildren } from "react"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, runOnJS, useAnimatedStyle, withTiming, withSpring } from "react-native-reanimated";

type CustomTouchableProps = PropsWithChildren<{
    onPress?: () => void;
}>;

export const CustomTouchableScale: React.FC<CustomTouchableProps> = ({
    children,
    onPress
}) => {
    const isActive = useSharedValue(false)

    const gesture = Gesture.Tap()
    .maxDuration(10000)
    .onTouchesDown(() => {
        isActive.value = true;
    })
    .onTouchesUp(() => {
        if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
        isActive.value = false;
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            // opacity: withTiming(isActive.value ? 0.5 : 1, {
            //     duration: 100,
            // }),
            transform: [
            //     {
            //         rotate: withSpring(isActive.value ? `${Math.PI / 12}rad` : '0rad'),
            //     },
                {
                    scale: withSpring(isActive.value ? 0.80 : 1, ),
                },
            ],
        };
    });

    return (
        <GestureDetector gesture= {gesture}> 
            <Animated.View style={rStyle}>
                {children}
            </Animated.View> 
        </GestureDetector>
    )}