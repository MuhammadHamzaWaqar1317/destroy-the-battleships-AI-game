import React, { useEffect, useState } from "react";
import GridTile from "../components/GridTile";
import Modal from "../components/Modal";
import { notification } from "antd";
import { insults } from "../utils/insults";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ships, setShips] = useState([]);
  const [learnFromUserTargets, setlearnFromUserTargets] = useState([]);
  const [shipLocations, setShipLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState("hard");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (title, description) => {
    api["error"]({
      message: title,
      description,
    });
  };

  const restartGame = () => {
    setShips([]);
    setlearnFromUserTargets([]);
    setShipLocations([]);
    setGameOver(false);
    setShips([...generateShipsArray()]);
  };

  const handleClick = (index) => {
    learnFromUserTargets.push(index);
    if (learnFromUserTargets.length == 9) {
      setGameOver(true);
      if (gameMode == "easy") {
        ships.forEach((ship) => (ship.initialValue = false));
        setShips([...ships]);
      } else {
        findSafestPath();
        openNotification(
          "You Lost :(",
          insults[Math.floor(Math.random() * insults.length)]
        );
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

  const findSafestPath = () => {
    const totalNeeded = 8;
    const maxRange = 50;
    const result = new Set();
    const existingSet = new Set(learnFromUserTargets);

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

    ships.forEach((ship) => (ship.shipHere = false));

    result.forEach((index) => (ships[index].shipHere = true));

    setShips([...ships]);
  };

  useEffect(() => {
    setShips([...generateShipsArray()]);
  }, []);
  function generateShipsArray() {
    const total = 50;
    const shipCount = 8;

    const ships = Array.from({ length: total }, () => ({
      initialValue: true,
      shipHere: false,
      shipHit: false,
    }));

    const shipIndices = new Set();
    while (shipIndices.size < shipCount) {
      const randomIndex = Math.floor(Math.random() * total);
      shipIndices.add(randomIndex);
    }
    setShipLocations([...shipIndices]);
    console.log(shipIndices);

    shipIndices.forEach((index) => {
      ships[index].shipHere = true;
    });

    return ships;
  }

  return (
    <>
      {contextHolder}
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
