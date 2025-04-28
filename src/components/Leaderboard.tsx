import { FunctionalComponent } from "preact";
import { LeaderboardItem } from "../api";

interface LeaderboardProps {
  players: LeaderboardItem[];
}

export const Leaderboard: FunctionalComponent<LeaderboardProps> = ({
  players,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Level</th>
            <th>XP</th>
            <th>Gold</th>
          </tr>
        </thead>
        <tbody>
          {players &&
            players.map((item: LeaderboardItem) => (
              <tr key={item.username}>
                <td>{item.rank}</td>
                <td>{item.username}</td>
                <td>{item.level}</td>
                <td>{item.xp}</td>
                <td>{item.gold}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
