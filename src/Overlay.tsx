import Animated, {FadeIn, FadeOut, withTiming} from "react-native-reanimated";
import {Pressable, StyleSheet, ViewStyle, useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {ANIMATION_DURATION, AnimationConfig, BORDER_RADIUS, PADDING} from "./constants";
import {OverlayActions} from "./Context";
import {clamp} from "./utilities";

export type OverlayProps = {
	/**
	 * Box style
	 */
	style?: ViewStyle;
	
	/**
	 * Box width: will not be larger than screen width
	 */
	width: number;

	/**
	 * Box height: will not be larger than screen height
	 */
	height: number;

	/**
	 * Colour of box
	 */
	colour?: string;

	/**
	 * x coordinate of where the box should animate from
	 */
	originX?: number;

	/**
	 * y coordinate of where the box should animate from
	 */
	originY?: number;

	/**
	 * Horizontal animation direction of box
	 */
	animationX?: "left" | "right" | "center";

	/**
	 * Vertical animation direction of box
	 */
	animationY?: "up" | "down" | "center";

	/**
	 * Initial scale of box when animating into view
	 */
	animationScale?: number;

	/**
	 * Duration of animation in milliseconds
	 */
	animationDuration?: number;

	/**
	 * Padding between box and screen edge
	 */
	screenPadding?: number;

	/**
	 * Colour of dimmed background
	 */
	dimmedBackgroundColour?: string;

	/**
	 * Opacity of dimmed background
	 */
	dimmedBackgroundOpacity?: number;
};



const Overlay = ({
	style,
	width,
	height,
	colour = "#2C3038",
	originX,
	originY,
	actions,
	children,
	animationX = "center",
	animationY = "center",
	animationScale = 0.5,
	screenPadding = 10,
	animationDuration = ANIMATION_DURATION,
	dimmedBackgroundColour = "#000000",
	dimmedBackgroundOpacity = 0.5
}: OverlayProps & {
	actions: OverlayActions,
	children?: React.ReactNode
}) => {

	// 👇 Screen
	const insets = useSafeAreaInsets();
	const screen = useWindowDimensions(); 
	const topInset = Math.max(insets.top, screenPadding);
	const leftInset = Math.max(insets.left, screenPadding);
	const rightInset = Math.max(insets.right, screenPadding);
	const bottomInset = Math.max(insets.bottom, screenPadding);


	// 👇 Clamp width and height to screen size - insets/padding
	width = clamp(width, 1, screen.width - rightInset - leftInset);
	height = clamp(height, 1, screen.height - bottomInset - topInset);


	// 👇 Default origin to center of screen
	if (originX === undefined) originX = leftInset + ((screen.width - rightInset - leftInset) / 2);
	if (originY === undefined) originY = topInset + ((screen.height - bottomInset - topInset)) / 2;


	// 👇 Calculate position of box
	let left = 0;
	let top = 0;

	switch (animationX) {
		case "center":
			left = originX - width / 2;
			break;
		case "left":
			left = originX - width;
			break;
		case "right":
			left = originX;
			break;
	};
	
	switch (animationY) {
		case "center":
			top = originY - height / 2;
			break;
		case "up":
			top = originY - height;
			break;
		case "down":
			top = originY;
			break;
	};


	// 👇 Clamp box position to within insets/padding
	left = clamp(left, leftInset, screen.width - rightInset - width);
	top = clamp(top, topInset, screen.height - bottomInset - height);


	// 👇 Entering Animation
	const entering = (values: any) => {
		"worklet";
		
		// 👇 Initial position offsets to move box into corner if animation direction is not "center"
		let offsetX = ((width * (1 - animationScale)) / 2);
		let offsetY = ((height * (1 - animationScale)) / 2);

		switch (animationX) {
			case "center":
				offsetX = 0;
				break;
			case "right":
				offsetX *= -1;
				break;
		};

		switch (animationY) {
			case "center":
				offsetY = 0;
				break;
			case "down":
				offsetY *= -1;
				break;
		};

		return {
			animations: {
				transform: [{scale: withTiming(1, AnimationConfig)}],
				originX: withTiming(values.targetOriginX, AnimationConfig),
				originY: withTiming(values.targetOriginY, AnimationConfig)
			},
			initialValues: {
				transform: [{scale: animationScale}],
				originX: values.targetOriginX + offsetX,
				originY: values.targetOriginY + offsetY
			}
		};
	};


	// 👇 Exiting Animation
	const exiting = (values: any) => {
		"worklet";

		// 👇 Initial position offsets to move box into corner if animation direction is not "center"
		let offsetX = ((width * (1 - animationScale)) / 2);
		let offsetY = ((height * (1 - animationScale)) / 2);

		switch (animationX) {
			case "center":
				offsetX = 0;
				break;
			case "right":
				offsetX *= -1;
				break;
		};

		switch (animationY) {
			case "center":
				offsetY = 0;
				break;
			case "down":
				offsetY *= -1;
				break;
		};

		return {
			animations: {
				transform: [{scale: withTiming(animationScale, AnimationConfig)}],
				originX: withTiming(values.currentOriginX + offsetX, AnimationConfig),
				originY: withTiming(values.currentOriginY + offsetY, AnimationConfig)
			},
			initialValues: {
				transform: [{scale: 1}],
				originX: values.currentOriginX,
				originY: values.currentOriginY
			}
		};
	};

	
	
	return (
		<Animated.View
			key="overlay"
			exiting={FadeOut.duration(animationDuration)}
			entering={FadeIn.duration(animationDuration)}
			style={Styles.container}>
			<Pressable
				onPress={actions?.pop}
				style={{
					...Styles.container,
					opacity: dimmedBackgroundOpacity,
					backgroundColor: dimmedBackgroundColour,
				}}
			/>
			<Animated.View
				key="box"
				exiting={exiting}
				entering={entering}
				style={[{
					top,
					left,
					width,
					height,
					backgroundColor: colour,
					...Styles.box,
				}, style]}>
				{children}
			</Animated.View>
		</Animated.View>
	);
};



const Styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		top: 0,
		zIndex: 1000000
	},
	box: {
		position: "absolute",
		borderRadius: BORDER_RADIUS,
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		zIndex: 2000000,
		alignItems: "center",
		justifyContent: "center",
	},
})



export default Overlay;