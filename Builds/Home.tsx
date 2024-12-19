import { useState, useEffect } from "react";
import KianMusic from "/kianmusic.mp3";
import {
  FaMinus,
  FaPause,
  FaPlay,
  FaPlus,
  FaTicketAlt,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa";

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

  const handleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

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
    setCount(1);
  };

  const Sections = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const TicketsRemain = ["3", "5", "6", "10", "12", "17", "14", "19"];
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

  const [count, setCount] = useState(1);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    if (count < Number(TicketsRemain[activeIndex ?? 0])) {
      setCount(count + 1);
    }
  };

  const [activeProfileIndex, setActiveProfileIndex] = useState<number | null>(
    null,
  );
  const handleProfileClick = (index: number) => {
    setActiveProfileIndex(activeProfileIndex === index ? null : index);
  };

  return (
    <div className="flex w-1/2 bg-neutral-100 px-16 py-14">
      <div
        className={`flex h-full w-full flex-col overflow-x-hidden pl-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar]:w-2 ${activeIndex === null ? "overflow-y-auto pr-3" : "overflow-y-hidden pr-5"}`}
      >
        {Array.from({ length: 8 }).map((_, index) => {
          const SectionsIndex = Sections[index % Sections.length];
          const TicketsRemainIndex =
            TicketsRemain[index % TicketsRemain.length];
          const PricesIndex = Prices[index % Prices.length];

          const isVisible = activeIndex === null || activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`mb-4 min-h-32 w-full cursor-pointer justify-between overflow-hidden rounded-2xl border-[1.5px] border-neutral-200 bg-white p-5 font-sans shadow-md hover:border-red-300 ${isVisible ? "flex" : "hidden"} ${activeProfileIndex === null ? "flex" : "hidden"}`}
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
        <div
          className={`w-full flex-grow flex-col justify-center gap-2 text-sm ${activeIndex === null ? "hidden" : "flex"}`}
        >
          <a
            className={`justify-center font-sans ${activeProfileIndex === null ? "flex" : "hidden"}`}
          >
            How many tickets?
          </a>
          <p
            className={`w-full items-center justify-center ${activeProfileIndex === null ? "flex" : "hidden"}`}
          >
            <a
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-[1px] border-neutral-300 bg-white text-xs text-neutral-500"
              onClick={handleDecrease}
            >
              <FaMinus />
            </a>
            <a className="flex h-10 w-10 items-center justify-center font-sans text-base">
              {count}
            </a>
            <a
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-[1px] border-neutral-300 bg-white text-xs text-neutral-500"
              onClick={handleIncrease}
            >
              <FaPlus />
            </a>
          </p>
          <div
            className={`mt-2 w-[calc(100%+1.25rem)] overflow-x-hidden overflow-y-scroll pr-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar]:w-2 ${activeProfileIndex === null ? "h-[92px]" : ""}`}
          >
            {Array.from({ length: count }).map((_, index) => (
              <p
                key={index}
                className={`mb-4 h-14 w-full cursor-pointer items-center rounded-xl border-[1.5px] border-red-500 bg-white text-red-500 shadow-md hover:border-neutral-400 hover:text-neutral-400 ${activeProfileIndex !== index && activeProfileIndex !== null ? "hidden" : "flex"}`}
                onClick={() => handleProfileClick(index)}
              >
                <a className="flex aspect-square h-full items-center justify-center">
                  <FaUserAlt className="text-xl" />
                </a>
                <a className="font-sans font-medium">Person {index + 1}</a>
              </p>
            ))}
          </div>
          <a
            className={`h-10 w-full items-center justify-center rounded-lg bg-blue-400 font-sans ${activeProfileIndex === null ? "flex" : "hidden"}`}
          >
            Buy Now
          </a>
          {Array.from({ length: count }).map((_, index) => (
            <div
              id={`profile${index + 1}`}
              className={`w-full flex-col ${activeProfileIndex === index ? "flex" : "hidden"}`}
              key={index}
            >
              <Profile />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <>
      <form action="#">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-2 flex font-sans text-sm font-medium text-neutral-600"
          >
            Full Name
          </label>
          <input
            type="text"
            className="mb-4 w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-sans text-sm text-black placeholder-neutral-500"
            placeholder="Enter full name"
            required
          />
          <label
            htmlFor="name"
            className="mb-2 flex font-sans text-sm font-medium text-neutral-600"
          >
            Email Address
          </label>
          <input
            type="text"
            className="mb-4 w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-sans text-sm text-black placeholder-neutral-500"
            placeholder="example@gmail.com"
            required
          />
          <label
            htmlFor="name"
            className="mb-2 flex font-sans text-sm font-medium text-neutral-600"
          >
            Phone Number
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 font-sans text-sm text-black placeholder-neutral-500"
            placeholder="+62-XXX-XXXX-XXXX"
            required
          />
        </div>
      </form>
    </>
  );
};
