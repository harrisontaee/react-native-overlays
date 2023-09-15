# React Native Overlays

A simple system for rendering multiple dropdown windows and overlays at given coordinates.

![](demo.mp4)

## Installation
```bash
# 👇 Install Dependencies
npx expo install react-native-safe-area-context react-native-reanimated

# 👇 Install Package
yarn add @harrisontaee/react-native-overlays # OR npm install @harrisontaee/react-native-overlays
```

## Example
```bash
git clone https://github.com/harrisontaee/react-native-overlays.git
cd example
yarn # OR npm install
```

## Setup

```tsx
// 👇 Import Providers
import {SafeAreaProvider} from "react-native-safe-area-context";
import OverlayProvider from "@harrisontaee/react-native-overlays";

export default function App() {
   // 👇 Wrap your app in the providers
   return (
      <SafeAreaProvider>
         <OverlayProvider>
            {...}
         </OverlayProvider>
      </SafeAreaProvider>
   );
}
```

## Usage
```tsx
// 👇 Import the hook
import {useOverlayActions} from "@harrisontaee/react-native-overlays";
```
```tsx
export default function ExampleComponent() {
   // 👇 Expose the hook
   const overlays = useOverlayActions();


   const onPress = () => {
      // 👇 Push a component as an overlay to the stack
      overlays.push(Dropdown, {
         // 👇 Box Dimensions
         width: 200,
         height: 300
         // 👇 Animation Config
         originX: 50,
         originY: 50,
         animationX: "right",
         animationY: "down",
         /*
         With the above config, the overlay
         will animate from box A to B.

        (O) _____________
         |       |       |
         |  (A)  |       |
         |_______|       |
         |               |
         |      (B)      |
         |               |
         |               |
         |_______________|

         The origin, denoted by O, is 
         positioned in the top left hand
         corner as the animation always
         occurs relative to the origin.

         If we change the following:

         animationX: "left",
         animationY: "center"

         We will see the following,
         again from A to B from O:

          _______________
         |               |
         |               |
         |        _______|
         |       |       |
         |   (B) |  (A) (O)
         |       |_______|
         |               |
         |               |
          ---------------

         */
      })
   };


   return (
      <View style={styles.container}>
         <TouchableOpacity
            onPress={onPress}
            style={styles.button}>
            <Text style={styles.text}>
               Open Overlay!
            </Text>
         </TouchableOpacity>
      </View>
   );
};
```

```tsx