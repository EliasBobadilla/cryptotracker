import React, {Component} from 'react'
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native'
import Http from '../../libs/http'
import CoinsItem from './CoinsItem'
import Colors from '../../libs/colors'
import CoinsSearch from './CoinsSearch'

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({loading: true})
    const res = await Http.instance.get('https://api.coinlore.net/api/tickers')
    this.setState({coins: res.data, allCoins: res.data, loading: false})
  }

  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', {coin})
  }

  handleSearch = query => {
    const {allCoins} = this.state

    const filteredCoins = allCoins.filter(coin => {
      const {name, symbol} = coin
      const value = query.toLowerCase()
      return (
        name.toLowerCase().includes(value) ||
        symbol.toLowerCase().includes(value)
      )
    })

    this.setState({coins: filteredCoins})
  }

  render() {
    const {coins, loading} = this.state
    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />
        {loading ? <ActivityIndicator color="#fff" size="large" /> : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
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
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
})

export default CoinsScreen
