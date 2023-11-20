import React from 'react'
import { Image, View } from 'react-native'

export const LogoApp = () => {
  return (
    <View style={{
        alignItems: 'center'
    }}>
        <Image
            source={ require('../assets/logo.png') }
            style={{
                width: 240,
                height: 80
            }}
        />
    </View>
  )
}