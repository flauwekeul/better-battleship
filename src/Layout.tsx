import PlayerField from "./components/PlayerField";
import { PlayerId } from "./types/entities";

const Layout = () => {
  const players: PlayerId[] = ["player1", "player2"];

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full grid grid-rows-[1fr_64px] gap-2">
        <div className="grid grid-cols-2">
          {players.map((playerId) => (
            <PlayerField playerId={playerId} key={playerId} />
          ))}
        </div>

        <div className="h-[64px] border-t text-center">status bar</div>
      </div>
    </div>
  );
};

export default Layout;
