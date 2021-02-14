import React from 'react';

import Header from '../components/Header';
import Tabs from '../components/tabs/Tabs';
import Tab from '../components/tabs/Tab';
import Ranking from '../components/ranking/Ranking';
import Medals from '../components/medals/Medals';
import styles from './App.module.css';
import client from '../client';

class App extends React.Component {

  state = {
    tab: 'tournaments',
    members: [],
    medals: undefined,
    blitzRanking: undefined,
    rapidRanking: undefined,
    puzzleRanking: undefined
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    // only two requests at a time allowed
    await this.loadTournaments();
    await this.loadRankings();
  }

  async loadTournaments() {
    const data = {};

    const arenaTournaments = await client.fetchArenaTournaments();
    const arenaTournamentIds = arenaTournaments
      .filter(t => !JSON.stringify(t).includes("teamBattle"))
      .filter(t => t.winner)
      .map(t => t.id);

    while (arenaTournamentIds.length !== 0) {
      const result = await client.fetchArenaTournamentResult(arenaTournamentIds.shift());
      if (result[0]) {
        const username = result[0].username;
        if (!data[username]) data[username] = { username: username, gold: 0, silver: 0, bronze: 0 };
        data[username].gold++;
      }
      if (result[1]) {
        const username = result[1].username;
        if (!data[username]) data[username] = { username: username, gold: 0, silver: 0, bronze: 0 };
        data[username].silver++;
      }
      if (result[2]) {
        const username = result[2].username;
        if (!data[username]) data[username] = { username: username, gold: 0, silver: 0, bronze: 0 };
        data[username].bronze++;
      }
      if (arenaTournamentIds.length % 5 === 0) {
        await sleep(1000);
      }
    }

    const swissTournaments = await client.fetchSwissTournaments();
    const swissTournamentIds = swissTournaments
      .filter(t => t.status === "finished")
      .map(t => t.id);

    while (swissTournamentIds.length !== 0) {
      const result = await client.fetchSwissTournamentResult(swissTournamentIds.shift());
      if (result[0]) {
        const username = result[0].username;
        if (!data[username]) data[username] = { username: username, gold: 0, silver: 0, bronze: 0 };
        data[username].gold++;
      }
      if (result[1]) {
        const username = result[1].username;
        if (!data[username]) data[username] = { username: username, gold: 0, silver: 0, bronze: 0 };
        data[username].silver++;
      }
      if (result[2]) {
        const username = result[2].username;
        if (!data[username]) data[username] = { username: username, gold: 0, silver: 0, bronze: 0 };
        data[username].bronze++;
      }
      if (swissTournamentIds.length % 5 === 0) {
        await sleep(1000);
      }
    }

    console.log(data);

    const medals = [];
    for (var user in data) {
      medals.push(data[user]);
    }

    this.setState({
      medals: medals
        .sort((a, b) =>
          (a.gold < b.gold) ? 1 : ((b.gold < a.gold) ? -1 :
            (a.silver < b.silver) ? 1 : ((b.silver < a.silver) ? -1 :
              (a.bronze < b.bronze) ? 1 : ((b.bronze < a.bronze) ? -1 : 0))))
    });
  }

  loadRankings() {
    client.fetchMembers().then(members => {

      const blitzProv = (x) => !x.perfs.blitz || x.perfs.blitz.prov;
      const blitzRating = (x) => x.perfs.blitz.rating;
      const rapidProv = (x) => !x.perfs.rapid || x.perfs.rapid.prov;
      const rapidRating = (x) => x.perfs.rapid.rating;
      const puzzleProv = (x) => !x.perfs.puzzle || x.perfs.puzzle.prov;
      const puzzleRating = (x) => x.perfs.puzzle.rating;

      this.setState({
        blitzRanking: members
          .filter(x => !blitzProv(x))
          .sort((a, b) => (blitzRating(a) < blitzRating(b)) ? 1 : ((blitzRating(b) < blitzRating(a)) ? -1 : 0))
          .map(x => {
            const y = {
              username: x.username,
              profile: x.url,
              rating: blitzRating(x)
            };
            return y;
          }),
        rapidRanking: members
          .filter(x => !rapidProv(x))
          .sort((a, b) => (rapidRating(a) < rapidRating(b)) ? 1 : ((rapidRating(b) < rapidRating(a)) ? -1 : 0))
          .map(x => {
            const y = {
              username: x.username,
              profile: x.url,
              rating: rapidRating(x)
            };
            return y;
          }),
        puzzleRanking: members
          .filter(x => !puzzleProv(x))
          .sort((a, b) => (puzzleRating(a) < puzzleRating(b)) ? 1 : ((puzzleRating(b) < puzzleRating(a)) ? -1 : 0))
          .map(x => {
            const y = {
              username: x.username,
              profile: x.url,
              rating: puzzleRating(x)
            };
            return y;
          })
      });
    });
  }

  render() {
    return <div className={styles.app}>
      <Header />
      <Tabs>
        <Tab
          onClick={() => this.setState({ tab: 'tournaments' })}
          selected={this.state.tab === 'tournaments'}>
          ♞ Turniere
        </Tab>
        <Tab
          onClick={() => this.setState({ tab: 'blitz' })}
          selected={this.state.tab === 'blitz'}>
          ♞ Blitz
        </Tab>
        <Tab
          onClick={() => this.setState({ tab: 'rapid' })}
          selected={this.state.tab === 'rapid'}>
          ♞ Schnellschach
        </Tab>
        <Tab
          onClick={() => this.setState({ tab: 'puzzle' })}
          selected={this.state.tab === 'puzzle'}>
          ♞ Puzzle
        </Tab>
      </Tabs>
      {this.state.tab !== 'tournaments' ? '' :
        <Medals entries={this.state.medals} />
      }
      {this.state.tab !== 'blitz' ? '' :
        <Ranking entries={this.state.blitzRanking} />
      }
      {this.state.tab !== 'rapid' ? '' :
        <Ranking entries={this.state.rapidRanking} />
      }
      {this.state.tab !== 'puzzle' ? '' :
        <Ranking entries={this.state.puzzleRanking} />
      }
    </div>
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App;
