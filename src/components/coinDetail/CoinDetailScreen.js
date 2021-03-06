import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native'
import Colors from '../../libs/colors'
import Http from '../../libs/http'
import CoinMarketItem from './CoinMarketItem'

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
  }
  componentDidMount() {
    const {coin} = this.props.route.params
    this.props.navigation.setOptions({title: coin.symbol})
    this.getMarket(coin.id)
    this.setState({coin})
  }

  getSymbolIcon = symbol => {
    if (!symbol) return
    return `https://c1.coinlore.com/img/25x25/${symbol
      .toLowerCase()
      .replaceAll(' ', '-')}.png`
  }

  getSections = coin => {
    return [
      {title: 'Market Cap', data: [coin.market_cap_usd]},
      {title: 'Volume 24h', data: [coin.volume24]},
      {title: 'Change 24h', data: [coin.percent_change_24h]},
    ]
  }

  getMarket = async id => {
    const markets = await Http.instance.get(
      `https://api.coinlore.net/api/coin/markets/?id=${id}`,
    )
    this.setState({markets})
  }

  render() {
    const {coin, markets} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.coinIcon}
            source={{uri: this.getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          sections={this.getSections(coin)}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  coinIcon: {
    height: 25,
    width: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
})

export default CoinDetailScreen
