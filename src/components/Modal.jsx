import React, { useState } from "react";
import { Button, Modal as AntdModal, Radio } from "antd";
import { VscDebugRestart } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";

function Modal({
  isModalOpen,
  setIsModalOpen,
  gameMode,
  setGameMode,
  restartGame,
}) {
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onGameModeChange = (e) => {
    setGameMode(e.target.value);
  };

  const resetGame = () => {
    restartGame();
    handleCancel();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <CiSettings size={20} className="text-white " /> Settings
      </Button>
      <AntdModal
        title="Settings"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Apply"
      >
        <div className="flex flex-col gap-2">
          <Radio.Group onChange={onGameModeChange} defaultValue={gameMode}>
            <Radio.Button value="easy">Easy</Radio.Button>
            <Radio.Button value="hard">Hard</Radio.Button>
          </Radio.Group>

          <Button type="primary" onClick={resetGame}>
            <VscDebugRestart /> Restart Game
          </Button>
        </div>
      </AntdModal>
    </>
  );
}

export default Modal;
