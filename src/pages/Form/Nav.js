import React from 'react';
import styles from './Form.module.css';
import {NavLink} from 'react-router-dom';
function Nav(){
    return(
        <nav className={styles.navform}>
            <ul>
            <li><NavLink to="/FormLogin">LogIn</NavLink></li>
            <li className={styles.child}><NavLink to="/Form">Register</NavLink></li>
            </ul>
        </nav>
    )
}
export default Nav;