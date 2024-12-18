import { useState, useEffect } from "react";
import KianMusic from "/kianmusic.mp3";
import { FaPause, FaPlay, FaTicketAlt, FaTimes } from "react-icons/fa";

interface BodyProps {
  onBuyTicket: () => void;
}

interface ContainerProps {
  isVisible: boolean;
}

function Home() {
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const handleBuyTicket = () => {
    setIsContainerVisible(true);
  };

  const handleCloseContainer = () => {
    setIsContainerVisible(false);
  };

  return (
    <>
      <Bar />
      <Overlay />
      <Body onBuyTicket={handleBuyTicket} />
      <Container
        isVisible={isContainerVisible}
        onClose={handleCloseContainer}
      />
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
    <>
      <div className="fixed left-0 top-0 ml-2 flex items-start gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 ml-2 flex items-end gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-t from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </div>
      <div className="fixed right-0 top-0 mr-2 flex flex-row-reverse items-start gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </div>
      <div className="fixed bottom-0 right-0 mr-2 flex flex-row-reverse items-end gap-2">
        {heights.map((height, index) => (
          <a
            key={index}
            className="w-1 bg-gradient-to-t from-yellow-400 via-yellow-200 to-yellow-200"
            style={{ height, transition: "height 100ms ease-in-out" }}
          />
        ))}
      </div>
    </>
  );
};

const Overlay = () => {
  const numberOfBars = 10;
  const [heights, setHeights] = useState(Array(numberOfBars).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(
        heights.map((_, index) => {
          const maxHeight = 30 - index * (30 / numberOfBars);
          return Math.random() * maxHeight;
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const [audio] = useState(new Audio(KianMusic));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio]);

  const handleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="fixed top-5 flex flex-col items-center justify-center text-xs text-yellow-200">
        <div
          className="flex h-8 cursor-pointer items-center gap-1"
          onClick={handleMusic}
        >
          <p className="flex flex-row-reverse items-center gap-1">
            {heights.map((height, index) => (
              <a
                key={index}
                className="w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-200"
                style={{ height, transition: "height 100ms ease-in-out" }}
              />
            ))}
          </p>
          <FaPlay style={{ display: isPlaying ? "none" : "flex" }} />
          <FaPause style={{ display: isPlaying ? "flex" : "none" }} />
          <p className="flex items-center gap-1">
            {heights.map((height, index) => (
              <a
                key={index}
                className="w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-200"
                style={{ height, transition: "height 100ms ease-in-out" }}
              />
            ))}
          </p>
        </div>
        <div className="absolute bottom-0 translate-y-full content-center text-center font-sans">
          Click To Play
        </div>
      </div>
      <div className="fixed bottom-5 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text font-sans text-sm text-transparent">
        ©2024. All rights reserved.
      </div>
    </>
  );
};

const Body: React.FC<BodyProps> = ({ onBuyTicket }) => {
  return (
    <div className="fixed flex flex-col items-center justify-center text-center">
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
          PRESENTED BY DJ KIAN UNAJA
        </a>
        <a className="z-10 mb-8 text-3xl text-white">
          PRESENTED BY DJ KIAN UNAJA
        </a>
      </p>
      <a
        className="h-16 w-48 cursor-pointer content-center rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 text-3xl text-black shadow-[0_0_50px_5px_black]"
        onClick={onBuyTicket}
      >
        BUY TICKET
      </a>
    </div>
  );
};

const Container: React.FC<ContainerProps & { onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  return (
    <>
      <div
        className={`pointer-events-none fixed h-screen w-screen bg-black transition-opacity delay-300 duration-500 ${isVisible ? "opacity-65" : "opacity-0"}`}
      ></div>
      <div
        className={`fixed flex h-screen w-screen items-center justify-center p-10 transition-transform duration-500 ${isVisible ? "scale-100" : "scale-0"}`}
      >
        <div className="relative flex h-[30rem] w-full max-w-4xl overflow-clip rounded-2xl bg-neutral-100 text-center">
          <Stage />
          <Registration />
          <div
            className="absolute right-3 top-3 cursor-pointer text-xl"
            onClick={onClose}
          >
            <FaTimes />
          </div>
        </div>
      </div>
    </>
  );
};

const Stage = () => {
  return (
    <div className="flex w-1/2 items-center justify-center bg-neutral-200 px-6">
      <div className="relative flex aspect-square w-3/4 flex-col gap-1 overflow-clip rounded-[50%_50%_50%_50%_/_10%_10%_10%_10%] bg-white shadow-[0_0_0_8px_white,_0_0_0_10px_gray]">
        <p className="h-1/4 w-full gap-1">
          <a className="flex h-full w-2/6 items-center justify-center bg-blue-200 font-sans hover:bg-blue-300">
            F
          </a>
          <a className="flex h-full w-3/6 items-center justify-center bg-blue-200 font-sans hover:bg-blue-300">
            G
          </a>
          <a className="flex h-full w-2/6 items-center justify-center bg-blue-200 font-sans hover:bg-blue-300">
            H
          </a>
        </p>
        <p className="h-2/4 w-full gap-1 border-white">
          <a className="flex h-full w-1/5 items-center justify-center bg-blue-200 font-sans hover:bg-blue-300">
            B
          </a>
          <a className="h-full w-3/5 bg-blue-200 font-sans hover:bg-blue-300">
            <span className="flex h-1/3 items-center justify-center">A</span>
          </a>
          <a className="flex h-full w-1/5 items-center justify-center bg-blue-200 font-sans hover:bg-blue-300">
            C
          </a>
        </p>
        <p className="h-1/4 w-full">
          <a className="flex h-full w-1/2 justify-start bg-blue-200 font-sans hover:bg-blue-300">
            <span className="flex h-3/4 w-1/2 items-center justify-center">
              D
            </span>
          </a>
          <a className="flex h-full w-1/2 justify-end bg-blue-200 font-sans hover:bg-blue-300">
            <span className="flex h-3/4 w-1/2 items-center justify-center">
              E
            </span>
          </a>
        </p>
        <p className="absolute bottom-1/2 left-1/2 h-1/3 w-1/12 -translate-x-1/2 translate-y-full bg-neutral-400 shadow-[0_0_0_4px_white]" />
        <p className="absolute bottom-0 left-1/2 flex h-1/3 w-1/2 -translate-x-1/2 items-center justify-center overflow-clip rounded-[50%_50%_50%_50%_/_100%_100%_0%_0%] border-4 border-b-0 border-white bg-neutral-400 font-sans font-bold">
          STAGE
        </p>
        <p className="absolute bottom-1/2 left-1/2 h-1/6 w-1/4 -translate-x-1/2 translate-y-1/2 border-4 border-white bg-neutral-400" />
        <p className="absolute bottom-1/4 left-1/2 h-1/4 w-1/12 -translate-x-1/2 bg-neutral-400" />
      </div>
    </div>
  );
};

const Registration = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex w-1/2 bg-neutral-100 px-16 py-14">
      <div
        className={`h-full w-full overflow-y-auto overflow-x-hidden pl-5 pr-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar]:w-2 ${activeIndex === null ? "" : "pr-5"}`}
      >
        {Array.from({ length: 8 }).map((_, index) => {
          const Sections = ["A", "B", "C", "D", "E", "F", "G", "H"];
          const SectionsIndex = Sections[index % Sections.length];

          const TicketsRemain = ["3", "5", "6", "10", "12", "17", "14", "19"];
          const TicketsRemainIndex =
            TicketsRemain[index % TicketsRemain.length];

          const Prices = [
            "Rp4.016.989",
            "Rp3.398.436",
            "Rp3.525.849",
            "Rp2.954.494",
            "Rp2.903.483",
            "Rp2.107.325",
            "Rp2.495.853",
            "Rp2.149.751",
          ];
          const PricesIndex = Prices[index % Prices.length];

          const isVisible = activeIndex === null || activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`mb-4 flex h-32 w-full origin-top cursor-pointer justify-between overflow-hidden rounded-2xl border-[1.5px] border-neutral-200 bg-white p-5 font-sans shadow-md transition-transform duration-300 hover:border-red-300 ${isVisible ? "" : "hidden"}`}
            >
              <p className="flex flex-col justify-between text-left">
                <a className="font-sans text-base font-semibold">
                  Section {SectionsIndex}
                </a>
                <a className="flex items-center gap-1.5 font-sans text-xs text-red-600">
                  <FaTicketAlt className="text-base" />
                  {TicketsRemainIndex} tickets remaining
                </a>
              </p>
              <p className="flex flex-col text-right">
                <a className="font-sans text-sm font-bold">{PricesIndex}</a>
                <a className="font-sans text-xs font-medium text-neutral-400">
                  each
                </a>
              </p>
            </div>
          );
        })}
        {/* <div>tes</div> */}
      </div>
    </div>
  );
};

// const Profile = () => {
//   return (
//     <div className="flex w-1/2 flex-col items-start gap-2 px-16 py-14 text-sm">
//       <div className="flex w-full justify-between gap-2">
//         <input
//           type="text"
//           className="h-10 w-1/2 rounded-lg border-[1px] border-neutral-200 px-3 font-sans outline-none"
//           placeholder="First Name"
//         />
//         <input
//           type="text"
//           className="h-10 w-1/2 rounded-lg border-[1px] border-neutral-200 px-3 font-sans outline-none"
//           placeholder="Last Name"
//         />
//       </div>
//       <div className="flex w-full justify-between gap-2">
//         <input
//           type="text"
//           className="h-10 w-1/2 rounded-lg border-[1px] border-neutral-200 px-3 font-sans outline-none"
//           placeholder="Email address"
//         />
//         <input
//           type="text"
//           className="h-10 w-1/2 rounded-lg border-[1px] border-neutral-200 px-3 font-sans outline-none"
//           placeholder="Phone Number"
//         />
//       </div>
//     </div>
//   );
// };
