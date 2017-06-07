/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Account from './lib/Account.js'
import SynchronizedAccount from './lib/SynchronizedAccount.js'

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
  async _loadPersisted(){
    //await AsyncStorage.clear();

    accounts = []
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];

          accounts.push(new Account("site", key, value, ''));
        });
      });
    });

    this.setState({accounts: accounts});
  }
  _addAccount(account, password){
    account = new Account("site", account, password);
    sincro = new SynchronizedAccount(account, '');
    sincro.persist().done();
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
            <AccountList accounts={this.state.accounts} />
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

function AccountList(props) {
  return (
    <FlatList
      data={props.accounts}
      renderItem={({item}) => <AccountItem data={item}/>}/>
  );
}

function AccountItem(props){
  return (
    <Text>{props.data.site} => {props.data.user} - {props.data.password}</Text>
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
