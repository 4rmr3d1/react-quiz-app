import React, { Component } from 'react';

import './layout.css';

import MenuToggle from '../../components/navigation/menu-toggle';
import MenuList from "../../components/navigation/menu-list/menu-list";

export default class Layout extends Component {

  state = {
    menu: false,
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  closeMenuHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className="layout">

        <MenuList
          isOpen={this.state.menu}
          onClose={this.closeMenuHandler}
        />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}
