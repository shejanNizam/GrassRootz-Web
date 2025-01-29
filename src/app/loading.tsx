import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="w-[90%] flex justify-center items-center px-80 py-80 ">
        <Image
          src="https://i.stack.imgur.com/hzk6C.gif"
          width={1000}
          height={1000}
          alt="loading"
          className="w-96 mx-auto"
        />
      </div>
    </>
  );
}
