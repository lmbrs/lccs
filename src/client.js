import axios from 'axios';
import config from './config.json';

const BASE_URL = 'https://lichess.org/api';

// LICHESS API - FETCH CLUB MEMBERS
async function fetchMembers() {
    const response = await axios.get(`${BASE_URL}/team/${config.LICHESS_TEAM_ID}/users`);
    return response.data
        .replace(/\n+$/, "")
        .split('\n')
        .map(s => JSON.parse(s));
}

// LICHESS API - FETCH CLUB SWISS TOURNAMENTS
async function fetchSwissTournaments() {
    // TODO blockwise (default: 100)
    const response = await axios.get(`${BASE_URL}/team/${config.LICHESS_TEAM_ID}/swiss`);
    return response.data
        .replace(/\n+$/, "")
        .split('\n')
        .map(s => JSON.parse(s));
}

// LICHESS API - FETCH CLUB ARENA TOURNAMENTS
async function fetchArenaTournaments() {
    // TODO blockwise (default: 100)
    const response = await axios.get(`${BASE_URL}/team/${config.LICHESS_TEAM_ID}/arena`);
    return response.data
        .replace(/\n+$/, "")
        .split('\n')
        .map(s => JSON.parse(s));
}

// LICHESS API - FETCH ARENA TOURNAMENT RESULT (TOP 3)
async function fetchArenaTournamentResult(id) {
    const response = await axios.get(`${BASE_URL}/tournament/${id}/results?nb=3`);
    return response.data
        .replace(/\n+$/, "")
        .split('\n')
        .map(s => JSON.parse(s));
}

// LICHESS API - FETCH SWISS TOURNAMENT RESULT (TOP 3)
async function fetchSwissTournamentResult(id) {
    const response = await axios.get(`${BASE_URL}/swiss/${id}/results?nb=3`);
    return response.data
        .replace(/\n+$/, "")
        .split('\n')
        .map(s => JSON.parse(s));
}

export default {
    fetchMembers,
    fetchSwissTournaments,
    fetchArenaTournaments,
    fetchSwissTournamentResult,
    fetchArenaTournamentResult
};