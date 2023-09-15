import {Easing} from "react-native-reanimated";

export const ANIMATION_DURATION = 200;
export const BORDER_RADIUS = 8;
export const PADDING = 10;
export const AnimationConfig = {
	duration: ANIMATION_DURATION * 1.5,
	easing: Easing.out(Easing.back(1)),
};