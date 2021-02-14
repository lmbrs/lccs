import styles from './Tabs.module.css';

const tabs = (props) =>
    <nav>
        <ul>
            {props.children}
        </ul>
    </nav>

export default tabs;
