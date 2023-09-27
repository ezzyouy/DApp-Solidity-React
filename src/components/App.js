import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar'
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecBank from '../truffle_abis/DecentralBank.json'
import Main from './Main'

class App extends Component {
  async UNSAFE_componentWillMount () {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3 () {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      await window.web3.currentProvider.enable()
    } else {
      window.alert('No ethereum browser detected. Metamask ')
    }
  }

  async loadBlockchainData () {
    const web3 = await window.web3
    const account = await web3.eth.getAccounts()
    this.setState({ account: account[0] })
    console.log(account)

    const networkId = await web3.eth.net.getId()
    const tetherData = Tether.networks[networkId]
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
      this.setState({ tether })
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call()
      this.setState({ tetherBalance: tetherBalance.toString() })
      //console.log(tetherBalance + '')
    } else {
      window.alert('Error! Tether contract not deployed - no detected network!')
    }
    const rwdData = RWD.networks[networkId]
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
      this.setState({ rwd })
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
      this.setState({ rwdBalance: rwdBalance.toString() })
      //console.log({ balance: rwdBalance })
    } else {
      window.alert('Error! RWD contract not deployed - no detected network!')
    }
    const dBankData = DecBank.networks[networkId]
    if (dBankData) {
      const dbank = new web3.eth.Contract(DecBank.abi, dBankData.address)
      this.setState({ dbank })
      let stakingBalance = await dbank.methods
        .stakingBalance(this.state.account)
        .call()
      this.setState({ stakingBalance: stakingBalance.toString() })
      //console.log({ balance: stakingBalance })
    } else {
      window.alert(
        'Error! Decentral Bank contract not deployed - no detected network!'
      )
    }
    this.setState({ loading: false })
  }

  constructor (props) {
    super(props)
    this.state = {
      account: '0x0110',
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }
  render () {
    let content
    {
      this.state.loading
        ? (content = (
            <p id='loader' className='text-center' style={{ margin: '30px' }}>
              LOADING PLEASE...
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdBalance}
              stakingBalance={this.state.stakingBalance}
            />
          ))
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className='container  p-5 my-5'>
          <div className='row content'>
            <main
              role='main'
              className='col-lg-12 ml-auto mr-auto'
              style={{ maxWidth: '600vm', minHeight: '100vm' }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
