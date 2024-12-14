import { useState, useEffect } from "react";

function Home() {
  return (
    <>
      <Bar />
      <Body />
    </>
  );
}

export default Home;

const Bar = () => {
  const numberOfBars = 25;
  const [heights, setHeights] = useState(Array(numberOfBars).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(
        heights.map((_, index) => {
          const maxHeight = 200 - index * (200 / numberOfBars);
          return Math.random() * maxHeight;
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen">
      <p className="absolute left-0 top-0 ml-2 flex items-start gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </p>
      <p className="absolute bottom-0 left-0 ml-2 flex items-end gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-t from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </p>
      <p className="absolute right-0 top-0 mr-2 flex flex-row-reverse items-start gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </p>
      <p className="absolute bottom-0 right-0 mr-2 flex flex-row-reverse items-end gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-t from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </p>
    </div>
  );
};

const Body = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center text-center">
      <p className="relative flex items-center justify-center">
        <a className="absolute text-8xl text-black blur">
          GOLDEN FESTIVAL CONCERT
        </a>
        <a className="z-10 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-8xl text-transparent">
          GOLDEN FESTIVAL CONCERT
        </a>
      </p>
      <p className="relative flex items-center justify-center">
        <a className="absolute mb-8 text-3xl text-black blur">
          PRESENTED BY KIAN UNAJA DE LA CRUZ
        </a>
        <a className="z-10 mb-8 text-3xl text-white">
          PRESENTED BY KIAN UNAJA DE LA CRUZ
        </a>
      </p>
      <a className="h-16 w-48 cursor-pointer content-center rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-3xl text-black shadow-[0_0_50px_5px_black]">
        BUY TICKET
      </a>
    </div>
  );
};
