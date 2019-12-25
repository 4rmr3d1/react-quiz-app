import React, { Component } from 'react';

import './layout.css';

import MenuToggle from '../../components/navigation/menu-toggle';
import MenuList from "../../components/navigation/menu-list/menu-list";
import {connect} from "react-redux";

class Layout extends Component {

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
          isLogged={this.props.isLogged}
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

function mapStateToProps(state) {
  return {
    isLogged: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)
