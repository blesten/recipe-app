import { Stack } from 'expo-router'
import React from 'react'
import { Easing } from 'react-native-reanimated'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'simple_push',
        // @ts-ignore
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.out(Easing.ease),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.in(Easing.ease),
            },
          },
        },
      }}
    />
  )
}

export default Layout