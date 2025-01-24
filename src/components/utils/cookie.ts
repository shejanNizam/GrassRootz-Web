"use server";

import { cookies } from "next/headers";

export async function SetCookie({ token }: { token: string }) {
  const cookieStore = cookies();

  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
  });
}
