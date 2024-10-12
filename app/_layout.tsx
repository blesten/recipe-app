import { Stack } from 'expo-router'
import React from 'react'
import { Easing } from 'react-native-reanimated'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header if not needed
        gestureEnabled: true, // Allow swipe back gesture
        animation: 'simple_push', // The key part: enable slide-right transition
        // @ts-ignore
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500, // Duration of the animation in ms
              easing: Easing.out(Easing.ease), // Easing function for smooth transition
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.in(Easing.ease), // Closing transition
            },
          },
        },
      }}
    />
  )
}

export default Layout