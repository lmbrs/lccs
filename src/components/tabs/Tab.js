import styles from './Tab.module.css';

const tab = (props) =>
    <li className={props.selected ? styles.selected : ''}
        onClick={props.onClick}>
        {props.children}
    </li>

export default tab;
