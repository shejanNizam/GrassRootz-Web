import { ReactNode } from "react";

interface CustomHeadingProps {
  children: ReactNode;
}

export default function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <>
      <p className="font-bold text-3xl md:text-4xl lg:text-5xl text-primary text-center">
        {" "}
        {children}{" "}
      </p>
    </>
  );
}
