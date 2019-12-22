import React, { Component } from 'react';
import styles from './menu-list.module.css';

import Backdrop from "../../UI/backdrop";

const Links = [
  1, 2, 3
]

export default class MenuList extends Component {

  renderLinks() {
    return Links.map((link, i) => {
      return(
        <li key={i}>
          <a> Link {link} </a>
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
    ]

    return (
      <>
        <nav className={navClasses.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { isOpen ? <Backdrop onClick={onClose}/> : null }
      </>
    )
  }
}

