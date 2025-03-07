import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
}

export default function CustomButton({ children }: CustomButtonProps) {
  return (
    <>
      <button className=" px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:border hover:border-primary hover:text-primary hover:bg-white">
        {children}
      </button>
    </>
  );
}
