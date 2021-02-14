import styles from './Loading.module.css';

const loading = (props) =>
    <tr>
        <td colSpan={props.colSpan}>
            <span className={styles.loader}></span>
        </td>
    </tr>

export default loading;
