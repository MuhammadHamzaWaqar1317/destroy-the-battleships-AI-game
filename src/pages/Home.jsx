import React, { useEffect, useState } from "react";
import GridTile from "../components/GridTile";
import Modal from "../components/Modal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ships, setShips] = useState([]);
  const [userTargets, setUserTargets] = useState([]);
  const [shipLocations, setShipLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState("hard");

  const restartGame = () => {
    setShips([]);
    setUserTargets([]);
    setShipLocations([]);
    setGameOver(false);
    setShips([...generateShipsArray()]);
  };

  const handleClick = (index) => {
    userTargets.push(index);
    if (userTargets.length == 8) {
      setGameOver(true);
      if (gameMode == "easy") {
        ships.forEach((ship) => (ship.initialValue = false));
        setShips([...ships]);
      } else {
        repositionShips();
      }
      return;
    }
    if (gameMode == "easy") {
      ships[index].initialValue = false;
      if (shipLocations.includes(index)) {
        ships[index].shipHit = true;
      }
    } else {
      ships[index].shipHere = false;
      ships[index].initialValue = false;
    }
    setShips([...ships]);
  };

  const repositionShips = () => {
    const totalNeeded = 8;
    const maxRange = 50;
    const result = new Set();
    const existingSet = new Set(userTargets);

    const availableNumbers = [];
    for (let i = 0; i < maxRange; i++) {
      if (!existingSet.has(i)) {
        availableNumbers.push(i);
      }
    }

    if (availableNumbers.length < totalNeeded) {
      throw new Error("Not enough unique numbers available.");
    }

    while (result.size < totalNeeded) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      result.add(availableNumbers.splice(randomIndex, 1)[0]);
    }

    // ✅ Clear all previous ships
    ships.forEach((ship) => (ship.shipHere = false));

    // ✅ Set new ship locations
    result.forEach((index) => (ships[index].shipHere = true));

    setShips([...ships]);
  };

  useEffect(() => {
    setShips([...generateShipsArray()]);
  }, []);
  function generateShipsArray() {
    const total = 50;
    const shipCount = 8;

    // Step 1: Create an array with all shipHere set to false
    const ships = Array.from({ length: total }, () => ({
      initialValue: true,
      shipHere: false,
      shipHit: false,
    }));

    // Step 2: Randomly pick 8 unique indices to set shipHere to true
    const shipIndices = new Set();
    while (shipIndices.size < shipCount) {
      const randomIndex = Math.floor(Math.random() * total);
      shipIndices.add(randomIndex);
    }
    setShipLocations([...shipIndices]);
    console.log(shipIndices);

    // Step 3: Set shipHere to true at the selected indices
    shipIndices.forEach((index) => {
      ships[index].shipHere = true;
    });

    return ships;
  }

  return (
    <>
      <div className="h-10 p-3 flex justify-between">
        <h2 className="font-semibold text-2xl text-blue-500">
          Destroy The BattleShips
        </h2>
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          gameMode={gameMode}
          setGameMode={setGameMode}
          restartGame={restartGame}
        />
      </div>
      <div className="flex justify-center items-center h-[calc(100vh-40px)]">
        <div className="flex flex-wrap w-[480px] ">
          {ships?.map((ship, index) => (
            <GridTile
              ship={ship}
              index={index}
              handleClick={handleClick}
              gameOver={gameOver}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
