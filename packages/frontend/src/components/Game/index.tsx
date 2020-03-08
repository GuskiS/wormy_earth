import React, { memo, useEffect, useMemo } from "react";

import Sockets from "lib/Sockets";
import WormyEarth from "lib/WormyEarth";

import styles from "./styles.module.css";

const Game = memo(() => {
  const socket = useMemo(() => new Sockets("/socket"), []);
  const game = useMemo(() => new WormyEarth(), []);

  useEffect(() => {
    game.init(`.${styles.container}`);
    socket.emit("test", { hello: "world" });

    return () => {
      game.terminate();
      socket.terminate();
    };
  }, [socket, game]);

  return <div className={styles.container}>YOLO</div>;
});

export default Game;
