import './MedalsEntry.module.css';

const medalEntry = (props) =>
  <tr>
    <td>
      {props.username}
    </td>
    <td>
      {"🥇".repeat(props.gold)}
      {"🥈".repeat(props.silver)}
      {"🥉".repeat(props.bronze)}
    </td>
  </tr>

export default medalEntry;
