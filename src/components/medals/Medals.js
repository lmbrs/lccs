import MedalsEntry from './MedalsEntry';
import styles from './Medals.module.css';
import Loading from '../Loading';

const medals = (props) =>
  <div className={styles.wrapper}>
    <table>
      <thead>
        <tr>
          <th>Spieler</th>
          <th>Platzierung</th>
        </tr>
      </thead>
      <tbody>
      {props.entries === undefined
          ? <Loading colSpan={2} />
          : props.entries.map((entry, i) =>
            <MedalsEntry
              key={entry.username}
              username={entry.username}
              gold={entry.gold}
              silver={entry.silver}
              bronze={entry.bronze}
            />
          )
        }
      </tbody>
    </table>
  </div>

export default medals;
