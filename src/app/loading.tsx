import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="w-[90%] mx-auto py-20">
        <Image
          src="https://i.stack.imgur.com/hzk6C.gif"
          width={500}
          height={500}
          alt="loading"
          className="w-96 mx-auto"
        />
      </div>
    </>
  );
}
