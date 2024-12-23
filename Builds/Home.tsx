import { useState, useEffect, useRef } from "react";
import KianMusic from "/kianmusic.mp3";
import {
  FaCamera,
  FaEnvelope,
  FaHistory,
  FaMinus,
  FaPause,
  FaPhone,
  FaPlay,
  FaPlus,
  FaTicketAlt,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa";
import { Html5QrcodeScanner } from "html5-qrcode";
import QRCode from "qrcode";

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

  const [audio] = useState(() => {
    const newAudio = new Audio(KianMusic);
    newAudio.volume = 0.2;
    return newAudio;
  });
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
        <div className="absolute bottom-0 translate-y-full content-center text-center">
          Click To Play
        </div>
      </div>
      <div className="fixed bottom-5 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-sm text-transparent">
        ©2024. All rights reserved.
      </div>
    </>
  );
};

const Body: React.FC<BodyProps> = ({ onBuyTicket }) => {
  return (
    <div className="fixed flex flex-col items-center justify-center text-center">
      <p className="relative flex items-center justify-center">
        <a className="absolute font-['PassionOne'] text-8xl text-black blur">
          GOLDEN FESTIVAL CONCERT
        </a>
        <a className="z-10 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text font-['PassionOne'] text-8xl text-transparent">
          GOLDEN FESTIVAL CONCERT
        </a>
      </p>
      <p className="relative flex items-center justify-center">
        <a className="absolute mb-8 font-['PassionOne'] text-3xl text-black blur">
          PRESENTED BY DJ KIAN ARAP JUNIOR
        </a>
        <a className="z-10 mb-8 font-['PassionOne'] text-3xl text-white">
          PRESENTED BY DJ KIAN ARAP JUNIOR
        </a>
      </p>
      <a
        className="relative h-16 w-48 cursor-pointer content-center overflow-hidden rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 font-['PassionOne'] text-3xl text-black shadow-[0_0_50px_5px_black] transition-transform duration-300 hover:scale-110"
        onClick={onBuyTicket}
      >
        BUY TICKET
        {/* <span className="absolute left-0 top-0 h-full w-1 bg-white"></span> */}
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
          <a className="flex h-full w-2/6 cursor-pointer items-center justify-center bg-blue-200 hover:bg-blue-300">
            F
          </a>
          <a className="flex h-full w-3/6 cursor-pointer items-center justify-center bg-blue-200 hover:bg-blue-300">
            G
          </a>
          <a className="flex h-full w-2/6 cursor-pointer items-center justify-center bg-blue-200 hover:bg-blue-300">
            H
          </a>
        </p>
        <p className="h-2/4 w-full gap-1 border-white">
          <a className="flex h-full w-1/5 cursor-pointer items-center justify-center bg-blue-200 hover:bg-blue-300">
            B
          </a>
          <a className="h-full w-3/5 cursor-pointer bg-blue-200 hover:bg-blue-300">
            <span className="flex h-1/3 items-center justify-center">A</span>
          </a>
          <a className="flex h-full w-1/5 cursor-pointer items-center justify-center bg-blue-200 hover:bg-blue-300">
            C
          </a>
        </p>
        <p className="h-1/4 w-full">
          <a className="flex h-full w-1/2 cursor-pointer justify-start bg-blue-200 hover:bg-blue-300">
            <span className="flex h-3/4 w-1/2 items-center justify-center">
              D
            </span>
          </a>
          <a className="flex h-full w-1/2 cursor-pointer justify-end bg-blue-200 hover:bg-blue-300">
            <span className="flex h-3/4 w-1/2 items-center justify-center">
              E
            </span>
          </a>
        </p>
        <p className="absolute bottom-1/2 left-1/2 h-1/3 w-1/12 -translate-x-1/2 translate-y-full bg-neutral-400 shadow-[0_0_0_4px_white]" />
        <p className="absolute bottom-0 left-1/2 flex h-1/3 w-1/2 -translate-x-1/2 items-center justify-center overflow-clip rounded-[50%_50%_50%_50%_/_100%_100%_0%_0%] border-4 border-b-0 border-white bg-neutral-400 font-bold">
          STAGE
        </p>
        <p className="absolute bottom-1/2 left-1/2 h-1/6 w-1/4 -translate-x-1/2 translate-y-1/2 border-4 border-white bg-neutral-400" />
        <p className="absolute bottom-1/4 left-1/2 h-1/4 w-1/12 -translate-x-1/2 bg-neutral-400" />
      </div>
    </div>
  );
};

const Registration = () => {
  interface ScanResult {
    valid: boolean;
    message: string;
  }

  const [showTicketSection, setShowTicketSection] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [showScanDetails, setShowScanDetails] = useState(false);

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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [count, setCount] = useState(1);
  const [activeProfileIndex, setActiveProfileIndex] = useState<number | null>(
    null,
  );
  const [formFilled, setFormFilled] = useState<boolean[]>(
    Array(count).fill(false),
  );
  const [names, setNames] = useState<string[]>(Array(count).fill(""));
  const [formErrors, setFormErrors] = useState<boolean[]>(
    Array(count).fill(false),
  );
  const form = useRef<HTMLFormElement>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    setCount(1);
    setFormFilled(Array(count).fill(false));
    setNames(Array(count).fill(""));
    setFormErrors(Array(count).fill(false));
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      setFormFilled(formFilled.slice(0, count - 1));
      setNames(names.slice(0, count - 1));
      setFormErrors(formFilled.slice(0, count - 1));
    }
  };

  const handleIncrease = () => {
    if (count < Number(TicketsRemain[activeIndex ?? 0])) {
      setCount(count + 1);
      setFormFilled([...formFilled, false]);
      setNames([...names, ""]);
      setFormErrors([...formFilled, false]);
    }
  };

  const handleProfileClick = (index: number) => {
    setActiveProfileIndex(activeProfileIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    if (field === "name") {
      const updatedNames = [...names];
      updatedNames[index] = value;
      setNames(updatedNames);
    }
    const allFilled =
      document.querySelectorAll(`#profile${index + 1} input`).length === 3 &&
      Array.from(document.querySelectorAll(`#profile${index + 1} input`)).every(
        (input) => (input as HTMLInputElement).value.trim() !== "",
      );
    setFormFilled((prev) => {
      const newFilled = [...prev];
      newFilled[index] = allFilled;
      return newFilled;
    });
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  useEffect(() => {
    if (showTicketSection) {
      fetchAllTickets();
    }
  }, [showTicketSection]);

  useEffect(() => {
    let html5QrcodeScanner: any = null;

    if (showScanner) {
      html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1.0,
        },
        false,
      );

      const handleScanSuccess = async (decodedText: string) => {
        try {
          const ticketData = JSON.parse(decodedText);
          const response = await fetch(
            "http://localhost:3001/api/verify-ticket",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ticketData),
            },
          );

          const verificationResult = await response.json();
          setScanResult(verificationResult);
          setShowScanDetails(true);

          html5QrcodeScanner.clear();
        } catch (error) {
          console.error("Scanning error:", error);
          setScanResult({ valid: false, message: "Error scanning ticket" });
        }
      };

      const handleScanError = (error: any) => {
        console.warn(`Code scan error = ${error}`);
      };

      html5QrcodeScanner.render(handleScanSuccess, handleScanError);
    }

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch((error: any) => {
          console.error("Failed to clear html5QrcodeScanner", error);
        });
      }
    };
  }, [showScanner]);

  const fetchAllTickets = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tickets");
      const data = await response.json();
      if (data.success) {
        const ticketsWithQR = await Promise.all(
          data.tickets.map(async (ticket: any) => {
            const qrData = JSON.stringify({
              ticketId: ticket.ticketId,
              blockHash: ticket.blockHash,
            });
            const qrCode = await QRCode.toDataURL(qrData);
            return { ...ticket, qrCode };
          }),
        );
        setAllTickets(ticketsWithQR);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormErrors = Array(count).fill(false);
    let allFormsFilled = true;

    const ticketData = names.map((name, index) => {
      const email = document.getElementById(
        `email${index + 1}`,
      ) as HTMLInputElement;
      const phone = document.getElementById(
        `phone${index + 1}`,
      ) as HTMLInputElement;

      if (
        name.trim() === "" ||
        email.value.trim() === "" ||
        phone.value.trim() === ""
      ) {
        newFormErrors[index] = true;
        allFormsFilled = false;
      }

      return {
        fullname: name.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        section: Sections[activeIndex ?? 0],
        price: Prices[activeIndex ?? 0],
      };
    });

    setFormErrors(newFormErrors);

    if (allFormsFilled) {
      try {
        const response = await fetch(
          "http://localhost:3001/api/create-tickets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets: ticketData }),
          },
        );

        const result = await response.json();

        if (result.success) {
          await fetchAllTickets();
          setShowTicketSection(true);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert("An error occurred during form submission. Please try again.");
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const CloseTicket = () => {
    setShowTicketSection(false);
  };

  return (
    <>
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

            return activeProfileIndex === null
              ? isVisible && (
                  <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className="mb-4 flex min-h-32 w-full cursor-pointer justify-between overflow-hidden rounded-2xl border-[1.5px] border-neutral-200 bg-white p-5 shadow-md transition-transform duration-300 hover:scale-95 hover:border-neutral-400"
                  >
                    <p className="flex flex-col justify-between text-left">
                      <a className="text-base font-semibold">
                        Section {SectionsIndex}
                      </a>
                      <a className="flex items-center gap-1.5 text-xs text-red-600">
                        <FaTicketAlt className="text-base" />
                        {TicketsRemainIndex} tickets remaining
                      </a>
                    </p>
                    <p className="flex flex-col text-right">
                      <a className="text-sm font-bold">{PricesIndex}</a>
                      <a className="text-xs font-medium text-neutral-400">
                        each
                      </a>
                    </p>
                  </div>
                )
              : null;
          })}
          {activeIndex === null ? null : (
            <div className="flex w-full flex-grow flex-col justify-center gap-2 text-sm">
              {activeProfileIndex === null && (
                <a className="flex justify-center">How many tickets?</a>
              )}
              {activeProfileIndex === null && (
                <p className="flex w-full items-center justify-center">
                  <a
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-300 bg-white text-xs text-neutral-500"
                    onClick={handleDecrease}
                  >
                    <FaMinus />
                  </a>
                  <a className="flex h-10 w-10 items-center justify-center text-base">
                    {count}
                  </a>
                  <a
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-neutral-300 bg-white text-xs text-neutral-500"
                    onClick={handleIncrease}
                  >
                    <FaPlus />
                  </a>
                </p>
              )}
              <div
                className={`mt-2 w-[calc(100%+1.25rem)] overflow-x-hidden overflow-y-scroll pr-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar]:w-2 ${activeProfileIndex === null ? "h-[92px]" : ""}`}
              >
                {Array.from({ length: count }).map((_, index) =>
                  activeProfileIndex !== index &&
                  activeProfileIndex !== null ? null : (
                    <p
                      key={index}
                      className={`mb-4 flex h-14 w-full cursor-pointer items-center gap-4 rounded-xl border bg-neutral-50 px-4 shadow-md transition-transform duration-300 hover:scale-95 ${formFilled[index] ? "border-neutral-600 text-neutral-600" : `${formErrors[index] ? "border-red-500 text-red-500" : "border-neutral-300 text-neutral-300"}`}`}
                      onClick={() => handleProfileClick(index)}
                    >
                      <FaUserAlt className="text-xl" />
                      <a className="overflow-hidden font-medium">
                        {names[index] || `Person ${index + 1}`}
                      </a>
                    </p>
                  ),
                )}
              </div>
              {Array.from({ length: count }).map((_, index) => (
                <div
                  className={`w-full ${activeProfileIndex === index ? "flex" : "hidden"}`}
                  key={index}
                >
                  <form
                    id={`profile${index + 1}`}
                    ref={form}
                    className="flex w-full flex-col"
                    action="#"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        (e.target as HTMLInputElement).id,
                        (e.target as HTMLInputElement).value,
                      )
                    }
                  >
                    <a className="mb-2 flex text-sm font-medium text-neutral-600">
                      Full Name
                    </a>
                    <a className="mb-4 flex w-full items-center overflow-hidden rounded-lg border border-neutral-300 bg-white text-sm text-black placeholder-neutral-500">
                      <FaUserAlt className="ml-2.5 text-lg text-neutral-500" />
                      <input
                        id={`name${index + 1}`}
                        name="fullname"
                        autoComplete="off"
                        type="text"
                        className="flex-grow p-2.5 focus:outline-none"
                        placeholder="Enter full name"
                        required
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                      />
                    </a>
                    <a className="mb-2 flex text-sm font-medium text-neutral-600">
                      Email Address
                    </a>
                    <a className="mb-4 flex w-full items-center overflow-hidden rounded-lg border border-neutral-300 bg-white text-sm text-black placeholder-neutral-500">
                      <FaEnvelope className="ml-2.5 text-lg text-neutral-500" />
                      <input
                        id={`email${index + 1}`}
                        name="email"
                        autoComplete="off"
                        type="email"
                        className="flex-grow p-2.5 focus:outline-none"
                        placeholder="example@gmail.com"
                        required
                      />
                    </a>
                    <a className="mb-2 flex text-sm font-medium text-neutral-600">
                      Phone Number
                    </a>
                    <a className="flex w-full items-center overflow-hidden rounded-lg border border-neutral-300 bg-white text-sm text-black placeholder-neutral-500">
                      <FaPhone className="ml-2.5 text-lg text-neutral-500" />
                      <input
                        id={`phone${index + 1}`}
                        name="phonenumber"
                        autoComplete="off"
                        type="tel"
                        className="flex-grow p-2.5 focus:outline-none"
                        placeholder="+62-XXX-XXXX-XXXX"
                        required
                      />
                    </a>
                  </form>
                </div>
              ))}
              {activeProfileIndex === null && (
                <form onSubmit={handleSubmit}>
                  <input
                    type="submit"
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-400 font-medium text-white transition-transform duration-300 hover:scale-95 hover:bg-blue-500"
                    value="Buy Now"
                  />
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute bottom-5 right-5 cursor-pointer"
        onClick={() => setShowTicketSection(true)}
      >
        <FaHistory className="text-xl text-neutral-400" />
      </div>
      {showTicketSection && (
        <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-brightness-50">
          <div className="relative flex h-[32rem] w-[28rem] flex-col items-center justify-center rounded-3xl bg-neutral-100 text-sm text-neutral-600">
            {!selectedTicket && !showScanner && !showScanDetails ? (
              <>
                <a className="font-['PassionOne'] text-4xl text-neutral-800">
                  Ticket Purchase Confirmation
                </a>
                <a className="mt-4">Congratulations! You have successfully</a>
                <a className="mb-4">purchased your tickets.</a>
                <a className="mb-6 mt-2 flex items-center justify-center font-semibold">
                  View ticket:
                </a>
                <div className="grid h-32 w-10/12 overflow-y-scroll pl-5 pr-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar]:w-2">
                  {allTickets.map((ticket, index) => (
                    <a
                      key={index}
                      className="mb-4 flex h-14 w-full cursor-pointer items-center rounded-lg border border-neutral-200 bg-white px-4 font-semibold shadow-lg transition-transform duration-300 hover:scale-95 hover:border-neutral-600"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <FaUserAlt className="mr-4 text-xl" />
                      {ticket.fullname} - Section {ticket.section}
                    </a>
                  ))}
                </div>
                <a
                  className="mt-6 cursor-pointer rounded-lg bg-blue-500 px-4 py-2.5 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
                  onClick={CloseTicket}
                >
                  Confirmed
                </a>
                <a className="mt-10 text-xs font-light text-neutral-500">
                  Best wishes,
                </a>
                <a className="text-xs font-light text-neutral-500">
                  The Golden Concert Team
                </a>
                <a
                  className="absolute bottom-5 right-5 cursor-pointer text-2xl"
                  onClick={() => setShowScanner(true)}
                >
                  <FaCamera />
                </a>
              </>
            ) : showScanDetails ? (
              <div className="flex w-full flex-col items-center p-6">
                <h3 className="mb-6 text-2xl font-bold">
                  {scanResult?.valid ? "Valid Ticket" : "Invalid Ticket"}
                </h3>

                {scanResult?.valid && (scanResult as any).ticketData && (
                  <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg">
                    <p className="font-semibold">
                      Name: {(scanResult as any).ticketData?.name}
                    </p>
                    <p className="font-semibold">
                      Email: {(scanResult as any).ticketData.email}
                    </p>
                    <p className="font-semibold">
                      Phone: {(scanResult as any).ticketData.phonenumber}
                    </p>
                    <p className="font-semibold">
                      Section: {(scanResult as any).ticketData.section}
                    </p>
                    <p className="text-sm text-gray-500">
                      Purchase Time:
                      {new Date(
                        (scanResult as any).ticketData.timestamp,
                      ).toLocaleString()}
                    </p>
                  </div>
                )}

                <button
                  className="mt-6 cursor-pointer rounded-lg bg-blue-500 px-4 py-2.5 text-white"
                  onClick={() => {
                    setShowScanDetails(false);
                    setScanResult(null);
                  }}
                >
                  Back to Tickets
                </button>
              </div>
            ) : selectedTicket ? (
              <>
                <a className="font-['PassionOne'] text-4xl text-neutral-800">
                  {selectedTicket.fullname}'s Ticket
                </a>
                <a className="mt-6">QR Code:</a>
                <img
                  className="my-2 h-52 w-52 border"
                  src={selectedTicket.qrCode}
                  alt="Ticket QR Code"
                />
                <a className="text-xs text-neutral-500">
                  Ticket ID: {selectedTicket.ticketId}
                </a>
                <a className="mb-6 text-xs text-neutral-500">
                  Section: {selectedTicket.section}
                </a>
                <a
                  className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2.5 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
                  onClick={() => setSelectedTicket(null)}
                >
                  Back to List
                </a>
              </>
            ) : (
              <div className="flex w-full flex-col items-center justify-center">
                <div id="reader" className="w-full max-w-sm" />
                <a
                  className="mt-4 cursor-pointer rounded-lg bg-red-500 px-4 py-2.5 text-white"
                  onClick={() => setShowScanner(false)}
                >
                  Close Scanner
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
