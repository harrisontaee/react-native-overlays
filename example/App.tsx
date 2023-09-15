import OverlayActionsProvider, {useOverlayActions} from "@harrisontaee/react-native-overlays";
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from "react-native";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

const BUTTON_HEIGHT = 70;
const PADDING = 10;

const Home = () => {
	const overlays = useOverlayActions();
	const screen = useWindowDimensions();
	const insets = useSafeAreaInsets();

	return (
		<View style={{
			...Styles.container,
			paddingTop: Math.max(insets.top, PADDING),
			paddingBottom: Math.max(insets.bottom, PADDING),
			paddingLeft: Math.max(insets.left, PADDING),
			paddingRight: Math.max(insets.right, PADDING),
		}}>
			<View style={Styles.buttonContainer}>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#ff0000",
						backgroundColor: "#ff00003d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#ff0000"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originX: Math.max(insets.left, PADDING),
							originY: Math.max(insets.top, PADDING) + BUTTON_HEIGHT + PADDING,
							animationX: "right",
							animationY: "down",
							style: {
								borderWidth: 2,
								borderColor: "#ff0000",
								backgroundColor: "#ff00003d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#ff0000"}}>{"Right\nDown"}</Text>
				</Pressable>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#00ff00",
						backgroundColor: "#00ff003d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#00ff00"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originY: Math.max(insets.top, PADDING) + BUTTON_HEIGHT + PADDING,
							animationX: "center",
							animationY: "down",
							style: {
								borderWidth: 2,
								borderColor: "#00ff00",
								backgroundColor: "#00ff003d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#00ff00"}}>{"Center\nDown"}</Text>
				</Pressable>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#0000ff",
						backgroundColor: "#0000ff3d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#0000ff"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originX: screen.width - Math.max(insets.right, PADDING),
							originY: Math.max(insets.top, PADDING) + BUTTON_HEIGHT + PADDING,
							animationX: "left",
							animationY: "down",
							style: {
								borderWidth: 2,
								borderColor: "#0000ff",
								backgroundColor: "#0000ff3d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#0000ff"}}>{"Left\nDown"}</Text>
				</Pressable>
			</View>
			<View style={Styles.buttonContainer}>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#ff0000",
						backgroundColor: "#ff00003d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#ff0000"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originX: Math.max(insets.left, PADDING),
							animationX: "right",
							animationY: "center",
							style: {
								borderWidth: 2,
								borderColor: "#ff0000",
								backgroundColor: "#ff00003d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#ff0000"}}>{"Right\nCenter"}</Text>
				</Pressable>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#00ff00",
						backgroundColor: "#00ff003d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#00ff00"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							style: {
								borderWidth: 2,
								borderColor: "#00ff00",
								backgroundColor: "#00ff003d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#00ff00"}}>{"Center\nCenter"}</Text>
				</Pressable>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#0000ff",
						backgroundColor: "#0000ff3d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#0000ff"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originX: screen.width - Math.max(insets.right, PADDING),
							animationX: "left",
							style: {
								borderWidth: 2,
								borderColor: "#0000ff",
								backgroundColor: "#0000ff3d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#0000ff"}}>{"Left\nCenter"}</Text>
				</Pressable>
			</View>
			<View style={Styles.buttonContainer}>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#ff0000",
						backgroundColor: "#ff00003d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#ff0000"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originX: Math.max(insets.left, PADDING),
							originY: screen.height - Math.max(insets.bottom, PADDING) - BUTTON_HEIGHT - PADDING,
							animationX: "right",
							animationY: "up",
							style: {
								borderWidth: 2,
								borderColor: "#ff0000",
								backgroundColor: "#ff00003d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#ff0000"}}>{"Right\nUp"}</Text>
				</Pressable>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#00ff00",
						backgroundColor: "#00ff003d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#00ff00"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originY: screen.height - Math.max(insets.bottom, PADDING) - BUTTON_HEIGHT - PADDING,
							animationX: "center",
							animationY: "up",
							style: {
								borderWidth: 2,
								borderColor: "#00ff00",
								backgroundColor: "#00ff003d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#00ff00"}}>{"Center\nUp"}</Text>
				</Pressable>
				<Pressable
					style={{
						...Styles.button,
						borderColor: "#0000ff",
						backgroundColor: "#0000ff3d",
					}}
					onPress={() => {
						overlays.push(<Text style={{...Styles.text, color: "#0000ff"}}>Overlay</Text>, {
							width: 200,
							height: 254,
							originX: screen.width - Math.max(insets.right, PADDING),
							originY: screen.height - Math.max(insets.bottom, PADDING) - BUTTON_HEIGHT - PADDING,
							animationX: "left",
							animationY: "up",
							style: {
								borderWidth: 2,
								borderColor: "#0000ff",
								backgroundColor: "#0000ff3d",
							},
						});
					}}>
					<Text style={{...Styles.text, color: "#0000ff"}}>{"Left\nUp"}</Text>
				</Pressable>
			</View>
		</View>
	);
};


const App = () => {
	return (
		<SafeAreaProvider>
			<OverlayActionsProvider>
				<Home />
			</OverlayActionsProvider>
		</SafeAreaProvider>
	);
};


const Styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		height: BUTTON_HEIGHT,
		width: 100,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
	},
	text: {
		fontSize: 17,
		fontWeight: "500",
		textAlign: "center",
		color: "white",
	},
});

export default App;
