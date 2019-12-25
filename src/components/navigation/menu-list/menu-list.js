import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './menu-list.module.css';

import Backdrop from "../../UI/backdrop";

export default class MenuList extends Component {

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, i) => {
      return(
        <li key={i}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={styles.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {

    const {
      isOpen, onClose
    } = this.props;

    const navClasses  = [
      styles.MenuList ,
      !isOpen ? styles.close : ''
    ];

    const links = [
      {to: '/', label: 'List of Quiz', exact: true}
    ]

    if (this.props.isLogged) {
      links.push({to: '/quiz-creator', label: 'Create a Quiz', exact: false});
      links.push({to: '/logout', label: 'Logout', exact: false});
    } else {
      links.push({to: '/auth', label: 'Authorization', exact: false});
    }

    return (
      <>
        <nav className={navClasses.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { isOpen ? <Backdrop onClick={onClose}/> : null }
      </>
    )
  }
}

