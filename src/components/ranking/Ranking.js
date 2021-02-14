import styles from './Ranking.module.css';
import RankingEntry from './RankingEntry';
import Loading from '../Loading';

// .slice(0, 10) or not if expanded
const ranking = (props) =>
  <div className={styles.wrapper}>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Spieler</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {props.entries === undefined
          ? <Loading colSpan={3} />
          : props.entries.map((entry, i) =>
            <RankingEntry
              key={entry.username}
              rank={i + 1}
              username={entry.username}
              profile={entry.profile}
              rating={entry.rating}
            />
          )
        }
      </tbody>
    </table>
  </div>

export default ranking;
