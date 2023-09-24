import {ReactNode, createContext, useContext, useMemo, useState} from "react";

import Overlay, {OverlayProps} from "./Overlay";

/**
 * Actions used to modify the overlay stack
 - push: Displays a component in an overlay box
 - pop: Removes the topmost overlay
 - clear: Removes all overlays
 */
export type OverlayActions = {
	/**
	 * Displays a component in an overlay box
	 */
	push: (component: ReactNode, props: OverlayProps) => void;

	/**
	 * Removes the topmost overlay
	 */
	pop: () => void;

	/**
	 * Removes all overlays
	 */
	clear: () => void;
};



/**
 * Context used to modify the overlay stack
 */
const OverlaysContext = createContext<OverlayActions>({} as OverlayActions);



/**
 * Hook used to modify the overlay stack
 - push: Displays a component in an overlay box
 - pop: Removes the topmost overlay
 - clear: Removes all overlays
 */
export const useOverlays = () => {
	return useContext(OverlaysContext);
};



/**
 * Provides the overlay context. Make sure to wrap your app in this component.
 - WARNING: This component handles safe area insets automatically and should be wrapped in the SafeAreaProvider from react-native-safe-area-context
 */
const OverlaysProvider = ({
	colour,
	children
}: {
	colour?: string,
	children: ReactNode
}) => {
	const [overlays, setOverlays] = useState<[ReactNode, OverlayProps][]>([]);
	
	
	const actions = useMemo<OverlayActions>(() => ({
		clear: () => {
			setOverlays([])
		},
		pop: () => {
			setOverlays((overlays) => overlays.slice(0, -1))
		},
		push: (component: ReactNode, props: OverlayProps) => {
			setOverlays((overlays) => [...overlays, [component, props]])
		},
	}), []);


	return (
		<OverlaysContext.Provider value={actions}>
			{children}
			{overlays.map(([Component, props], index) => (
				<Overlay
					key={index}
					colour={colour}
					actions={actions}
					{...props}>
					{Component}
				</Overlay>
			))}
		</OverlaysContext.Provider>
	);
};



export default OverlaysProvider;