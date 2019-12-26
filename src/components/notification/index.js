import React, { Component } from "react";
import styled from 'styled-components';
import ee from 'event-emitter';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: ${state => state.right}px;
  
  transition: right 0.5s ease;
  z-index: 1000;
`;

const emitter = new ee();

export const notify = () => {
  emitter.emit('notification')
};

export default class Index extends Component {

  constructor() {
    super();
    emitter.on('notification', () => {
      this.onShow()
    });
  }

  state = {
    right: -300
  };

  timeout = null;


  onShow = () => {
    if(this.timeout){
      clearTimeout(this.timeout);
      this.setState({right: -300,}, () => {
        this.timeout = setTimeout(() => {
          this.showNotification();
        }, 500)
      })
    } else {
      this.showNotification();
    }
  };

  showNotification = () => {
    this.setState({
      right: 20
    },() => {
      this.timeout = setTimeout(() => {
        this.setState({
          right: -300
        });
      }, 3000);
    })
  };

  render () {
    return (
      <NotificationContainer right={this.state.right}>
        <div
          className='notification card text-white bg-success'>
          <div className="card-header"> Success !</div>
          <div className="card-body">
            <h4 className="card-title">Your test was created!</h4>
            <p className="card-text">This should be last one in the list!</p>
          </div>
        </div>
      </NotificationContainer>
    )
  }
}
