/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  AlertIOS,
  ListView,
  FlatList,
  AsyncStorage
} from 'react-native';

export default class AccountManager extends Component {
  constructor(props) {
    super(props);
    this.state = {view: 0, password: '', accounts: []};
  }
  async _persistAccount(account, password){
    try {
      await AsyncStorage.setItem(account, password);
    } catch (error) {
      // Error saving data
    }
  }
  async _loadPersisted(){
    accounts = []
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
       stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          accounts.push({account: key, password: value});
        });
      });
    });

    this.setState({accounts: accounts});
  }
  _addAccount(account, password){
    accounts = this.state.accounts;
    accounts.push({account: account, password: password});
    this.setState({accounts: accounts});
    this._persistAccount(account, password).done();
  }
  _loadAccounts(password){
    this.setState({view: 1, password: password});
    this._loadPersisted().done();
  }
  render() {
    return (
      <View style={styles.container}>
        { this.state.view == 0 &&
          <SignIn submit={this._loadAccounts.bind(this)}/>
        }
        {
          this.state.view == 1 &&
          <View>
            <AccountForm submit={this._addAccount.bind(this)} />
            <Accounts accounts={this.state.accounts} />
          </View>
        }
      </View>
    );
  }
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {password: ''};
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password} />

        <Button
          onPress={()=> {this.props.submit(this.state.password)}}
          title="Desbloquear"
          color="#841584"
          accessibilityLabel="Desbloquear" />
      </View>
    );
  }
}

function Accounts(props) {
  return (
    <FlatList
      data={props.accounts}
      renderItem={({item}) => <Account data={item}/>}/>
  );
}

function Account(props){
  return (
    <Text>{props.data.account} - {props.data.password}</Text>
  )
}

class AccountForm extends Component {
  constructor(){
    super();
    this.state = {account: '', password: ''};
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput
          style={{width: 50, height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({account: text})}
          value={this.state.account} />
        
        <TextInput
          style={{width: 50, height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password} />

        <Button
          onPress={()=> {this.props.submit(this.state.account, this.state.password)}}
          title="Guardar"
          color="#841584"
          accessibilityLabel="Desbloquear" />          
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AccountManager', () => AccountManager);
