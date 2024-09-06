import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/Button/Button'

import { useNavigation } from '@react-navigation/native'
import routes from '../../navigation/routes'


const Home = () => {
const navigation = useNavigation()

  return (
    <LinearGradient
    colors={['#101020', '#8a42ec']}
    style={styles.linearGradient}>

    <SafeAreaView>
      <View>
      <Text>Günlük</Text>
<Button title='aaa' onPress={()=>navigation.navigate(routes.PROFILE)} />
      </View>

    </SafeAreaView>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
})