import React from "react";
import { GiBattleship, GiSinkingShip, GiCornerExplosion } from "react-icons/gi";
import { MdWaves } from "react-icons/md";

function GridTile({ ship, index, handleClick, gameOver }) {
  const { initialValue, shipHere, shipHit } = ship;
  const size = 30;

  const gamePlayingTile = () => {
    if (initialValue) {
      return (
        <div onClick={() => handleClick(index)}>
          <MdWaves size={size} className="text-blue-700" />
        </div>
      );
    } else if (shipHere) {
      return <GiSinkingShip size={size} className="text-red-600" />;
    } else {
      return <GiCornerExplosion size={size} className="text-orange-600" />;
    }
  };

  const gameOverTile = () => {
    if (shipHit) {
      return <GiSinkingShip size={size} className="text-red-600" />;
    } else if (shipHere) {
      return <GiBattleship size={size} className="text-green-600" />;
    } else {
      return <MdWaves size={size} className="text-blue-700" />;
    }
  };

  return (
    <div className="w-12 h-12 border border-blue-400 flex justify-center items-center">
      {gameOver ? gameOverTile() : gamePlayingTile()}
    </div>
  );
}

export default GridTile;
