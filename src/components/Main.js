import React, { Component } from 'react'
import tether from '../tether.png'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log(this.props.tetherBalance)
    return (
      <div id='content' className='mt-3'>
        <table className='table text-muted text-center'>
          <thead>
            <tr>
              <th scope='col' style={{ color: 'black' }}>
                Staking balance
              </th>
              <th scope='col' style={{ color: 'black' }}>
                Reward Balance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope='col' style={{ color: 'black' }}>
                {window.web3.utils.fromWei(this.props.stakingBalance,'ether')}{' '}
                USDT
              </td>
              <td scope='col' style={{ color: 'black' }}>
                {window.web3.utils.fromWei(this.props.rwdBalance, 'ether')} RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className='card mb-2' style={{ opacity: '.9' }}>
          <form className='mb-3'>
            <div style={{ borderSpacing: '0 1em' }}>
              <label className='float-start' style={{ marginLeft: '15px' }}>
                <b>Stake Token</b>
              </label>
              <span className='float-end' style={{ marginRight: '8px' }}>
                Balance :{' '}
                {window.web3.utils.fromWei(this.props.tetherBalance, 'ether')}
              </span>
              <div className='input-group mb-4'>
                <input type='text' placeholder='0' required />
                <div className='input-grouped-open'>
                  <div className='input-group-text'>
                    <img alt='tether' src={tether} height='32' />
                    &nbsp;&nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-lg btn-block'
              >
                DEPOSIT
              </button>
            </div>
          </form>
          <button className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
          <div className='card-body text-center' style={{ color: 'blue' }}>
            AIRDROP
          </div>
        </div>
      </div>
    )
  }
}

export default Main
