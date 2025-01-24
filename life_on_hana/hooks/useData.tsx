'use client';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
type LocalData = {
  email: string;
  name: string | undefined | null;
  birth: string | undefined | null;
};
let DefaultData: LocalData = {
  email: '',
  name: '',
  birth: '',
};
const contextInitValue = {
  data: DefaultData,
  getSession: async () => {
    const sess: Session | null = { user: { email: '', name: '' }, expires: '' };
    return Promise.resolve(sess);
  },
  setInfo: async ({ birth, name }: { birth: string; name: string }) => {
    DefaultData = { ...DefaultData, name, birth };
    return name;
  },
};
type ContextProps = Omit<typeof contextInitValue, 'getSession' | 'setInfo'> & {
  getSession: () => Promise<Session | null>;
  setInfo: ({ name, birth }: { name: string; birth: string }) => void;
};
export const DataContext = createContext<ContextProps>(contextInitValue);
export const DataProvider = ({
  children,
  getSession,
  signOut,
}: PropsWithChildren & {
  getSession: () => Promise<Session | null>;
  signOut: () => void;
}) => {
  const [data, setData] = useState<LocalData>(DefaultData);

  const setDataWithStorage = useCallback(
    (newer: LocalData) => {
      const { email } = newer;
      if (!email) return;
      localStorage.setItem(email, JSON.stringify(newer));
      setData(newer);
      DefaultData = data;
    },
    [data]
  );

  const setInfo = ({ name, birth }: { name: string; birth: string }) => {
    const updateData = { ...data, name, birth };
    setDataWithStorage(updateData);
  };

  const router = useRouter();

  useEffect(() => {
    (async function () {
      const session = await getSession();
      if (!session?.user?.email) return;
      const { email } = session.user;
      const localData = JSON.parse(
        localStorage.getItem(email) || 'null'
      ) as LocalData;

      if (!localData) {
        setDataWithStorage({
          email,
          name: null,
          birth: null,
        });
      } else {
        if (email && localData.email !== email) {
          await signOut();
          return;
        }
        if (JSON.stringify(data) !== JSON.stringify(localData)) {
          setData(localData);
        }
      }
    })();
  }, [getSession, signOut, router, setDataWithStorage, data]);
  return (
    <DataContext.Provider value={{ data, getSession, setInfo }}>
      {children}
    </DataContext.Provider>
  );
};
