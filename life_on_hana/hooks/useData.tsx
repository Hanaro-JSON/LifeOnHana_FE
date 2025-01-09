"use client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
type LocalData = {
  email: string;
};
const DefaultData: LocalData = {
  email: "",
};
const contextInitValue = {
  data: DefaultData,
  getSession: async () => {
    const sess: Session | null = { user: { email: "" }, expires: "" };
    return Promise.resolve(sess);
  },
};
type ContextProps = Omit<typeof contextInitValue, "getSession"> & {
  getSession: () => Promise<Session | null>;
};
const DataContext = createContext<ContextProps>(contextInitValue);
export const DataProvider = ({
  children,
  getSession,
  signOut,
}: PropsWithChildren & {
  getSession: () => Promise<Session | null>;
  signOut: () => void;
}) => {
  const [data, setData] = useState<LocalData>(DefaultData);
  const setDataWithStorage = (newer: LocalData) => {
    const { email } = newer;
    if (!email) return;
    localStorage.setItem(email, JSON.stringify(newer));
    setData(newer);
  };
  const router = useRouter();
  useEffect(() => {
    (async function () {
      const session = await getSession();
      if (!session?.user?.email) return;
      const { email } = session.user;
      const localData = JSON.parse(
        localStorage.getItem(email) || "null"
      ) as LocalData;
      console.log(localData);
      if (!localData) {
        setDataWithStorage({
          email,
        });
      } else {
        if (email && localData.email !== email) {
          await signOut();
          localStorage.removeItem(email);
          router.push("/");
          return;
        }
        setData(localData);
      }
    })();
  }, [getSession, signOut, router]);
  return (
    <DataContext.Provider value={{ data, getSession }}>
      {children}
    </DataContext.Provider>
  );
};
