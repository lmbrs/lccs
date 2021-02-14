import styles from './RankingEntry.module.css';

const rankingEntry = (props) =>
  <tr>
    <td>
      <span className={styles.rank}>
        #{props.rank}
      </span>
    </td>
    <td>
      <a href={props.profile} target="_blank">
        {props.username}
      </a>
    </td>
    <td>{props.rating}</td>
  </tr>

export default rankingEntry;
