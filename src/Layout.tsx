import PlayerField from "./components/PlayerField";
import { useGameContext } from "./context/context";

const Layout = () => {
  const { currentPlayer, proposedShip, currentInteractiveShip, dispatch } =
    useGameContext();

  const onConfirmMoveship = () => {
    if (currentInteractiveShip && proposedShip?.positions) {
      dispatch({
        type: "move",
        ship: currentInteractiveShip,
        newPositions: proposedShip?.positions,
      });
    }
  };

  const onCancelMoveship = () => {
    dispatch({ type: "setCurrentInteractiveShip", ship: null });
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full grid grid-rows-[92px_1fr_64px] gap-2">
        <div className="relative p-4 border-b text-center">
          <h1 className="mt-3 text-4xl">Better Battleship</h1>

          {!!proposedShip && (
            <div className="bottom-0 absolute bg-green-100 py-1 px-5">
              <p>
                Do you want to move this ship?
                <button
                  className="ml-2 px-5 py-2 font-bold border rounded-md bg-green-500"
                  onClick={onConfirmMoveship}
                >
                  Ok
                </button>
                <button
                  className="ml-2 px-5 py-2 font-bold border rounded-md bg-green-300"
                  onClick={onCancelMoveship}
                >
                  Cancel
                </button>
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2">
          <PlayerField
            playerId="player1"
            isCurrentPlayer={currentPlayer === "player1"}
          />
          <PlayerField
            playerId="player2"
            isCurrentPlayer={currentPlayer === "player2"}
          />
        </div>

        <div className="h-[64px] border-t text-center">status bar</div>
      </div>
    </div>
  );
};

export default Layout;
