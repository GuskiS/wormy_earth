import React, { useEffect } from "react";
import Sockets from "lib/sockets";

const App = () => {
  useEffect(() => {
    const socket = new Sockets("/socket");
    socket.emit("test", { hello: "world" });

    return () => {
      socket.terminate();
    };
  }, []);

  return <div>Hello World</div>;
};

export default App;
