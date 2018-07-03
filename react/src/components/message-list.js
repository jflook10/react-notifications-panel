//@flow
import React, { Component } from 'react';
import Api from '../api';
import {Notification, Toast} from './notifications';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


class MessageList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      messages: [],
      toast: null
    };
  }
  componentWillMount() {
    this.api = new Api({
      messageCallback: (message) => {
        this.messageCallback(message);
      },
    });
  }
  componentDidMount() {
    this.api.start();
  }
  messageCallback(message) {
    this.setState({
      messages: [
        //push message to beggining of array
        message, ...this.state.messages.slice()
      ]
    }, () => {
      console.log(this.state.messages);
    });
    //condition for setToast call
    (!this.api.stopGeneration && message.priority === 1) ? this.setToast(message) : null; 
  }

  clearMessages(){
    this.setState({messages: []})
  }

  renderButton() {
    const isApiStarted = this.api.isStarted();
    return (
      <button onClick={() => {
        if (isApiStarted) {
          this.api.stop();
        } else {
          this.api.start();
        }
        this.forceUpdate();
      }}
      >{isApiStarted ? 'Stop Messages' : 'Start Messages'}</button>
    );
  }
  
  //grid for displaying notifications
  renderGrid(){
    let msg = this.state.messages;
    return (
      <div>
        <TransitionGroup className="ul-notifications" component={'ul'}>
          {msg.map((message) => 
            <CSSTransition
                key={message.id}
                timeout={500}
                classNames="fade"
              >
              <Notification message={message}/>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    )
  }

  //call to set toast notification
  setToast(message){
      this.setState({toast: message});
        setTimeout(() => {
          if (this.state.toast.id === message.id){
            this.setState({ toast: null });
          }
        }, 2000)
  }

  render() {
    return (
      <div className="div-messageList">
        <TransitionGroup className="toast-container">
          {this.state.toast ?  
            <CSSTransition
                key={this.state.toast.id}
                timeout={500}
                classNames="slide"
              >
              <Toast key={this.state.toast.id} toast={this.state.toast}/> 
            </CSSTransition>
          : null}
        </TransitionGroup>
        <div className="div-buttons-row">
          {this.renderButton()}
          <button onClick={() => {this.clearMessages()}}>Clear Messages</button>
        </div>
        {this.renderGrid()}
      </div>
    );
  }
}

export default MessageList;
