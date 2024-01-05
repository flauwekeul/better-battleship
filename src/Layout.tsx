import PlayerField from "./components/PlayerField";

const Layout = () => {
  const players = ["p1", "p2"];
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full grid grid-rows-[1fr_64px] gap-2">
        <div className="grid grid-cols-2">
          {players.map((playerName) => (
            <PlayerField playerName={playerName} key={playerName} />
          ))}
        </div>

        <div className="h-[64px] border-t text-center">status bar</div>
      </div>
    </div>
  );
};

export default Layout;
