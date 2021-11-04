import React, {Component} from 'react'
import {View, TextInput, Platform, StyleSheet} from 'react-native'
import Colors from '../../libs/colors'

class CoinsSearch extends Component {
  state = {
    query: '',
  }

  handleText = query => {
    this.setState({query})
    if (this.props.onChange) this.props.onChange(query)
  }
  render() {
    const {query} = this.state
    return (
      <View>
        <TextInput
          onChangeText={this.handleText}
          value={query}
          placeholder="Search coin"
          placeholderTextColor="#fff"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
  },
})

export default CoinsSearch
