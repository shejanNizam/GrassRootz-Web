import Image from "next/image";
import logo from "../../assets/main_logo.png";

interface DoorModalProps {
  handleOpen: () => void;
  handleUnderageAlert: () => void;
}

export default function DoorModal({
  handleOpen,
  handleUnderageAlert,
}: DoorModalProps) {
  return (
    <div>
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-full max-w-lg flex flex-col items-center justify-center bg-black p-8 rounded-lg border border-yellow-400 shadow-xl"
      >
        <Image
          src={logo}
          alt="Logo"
          width={1000}
          height={1000}
          className="w-44 h-32 mb-4"
        />
        <h2 className="text-primary text-3xl font-bold text-center">
          Welcome!
        </h2>
        <p className="text-white text-center font-semibold text-xl">
          You must be <span className="text-primary font-bold">21+</span> to
          enter this site
        </p>
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 bg-red-600 text-white rounded"
            onClick={handleUnderageAlert}
          >
            No
          </button>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded"
            onClick={handleOpen}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
