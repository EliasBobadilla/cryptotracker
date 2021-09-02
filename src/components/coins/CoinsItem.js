import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Colors from '../../libs/colors'

const CoinsItem = ({item}) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png')
    }

    return require('../../assets/arrow_down.png')
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`USD ${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imageIcon} source={getImageArrow()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  percentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 10,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  imageIcon: {
    height: 22,
    width: 22,
  },
})

export default CoinsItem
