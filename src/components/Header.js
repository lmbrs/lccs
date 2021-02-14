import config from '../config.json';
import styles from './Header.module.css';

const header = () =>
    <header>
        <a href={`https://lichess.org/team/${config.LICHESS_TEAM_ID}`} target="_blank">
            lichess.org/team/{config.LICHESS_TEAM_ID}
        </a>
    </header>

export default header;
