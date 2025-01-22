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
  setName: async (name: string) => {
    DefaultData = { ...DefaultData, name };
    return name;
  },
  setBirth: async (birth: string) => {
    DefaultData = { ...DefaultData, birth };
    return birth;
  },
};
<<<<<<< HEAD
type ContextProps = Omit<
  typeof contextInitValue,
  'getSession' | 'setName' | 'setBirth'
> & {
=======
type ContextProps = Omit<typeof contextInitValue, 'getSession' | 'setName'> & {
>>>>>>> 03b2a3f ([fix] 🐿️ next-auth로 인한 로그인 성공 후 /home으로 이동 안 되는 오류 해결)
  getSession: () => Promise<Session | null>;
  setName: (name: string) => void;
  setBirth: (birth: string) => void;
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
      if (JSON.stringify(data) !== JSON.stringify(newer)) {
        setData(newer);
      }
      DefaultData = data;
    },
    [data]
  );

  const setName = (name: string) => {
    const updateData = { ...data, name };
    setDataWithStorage(updateData);
  };
  const setBirth = (birth: string) => {
    const updateData = { ...data, birth };
    setDataWithStorage(updateData);
  };
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const session = await getSession();
      if (!session?.user?.email) return;
      const { email, name } = session.user;
      const localData = JSON.parse(
        localStorage.getItem(email) || 'null'
      ) as LocalData;

      if (!localData) {
        setDataWithStorage({
          email,
          name,
          birth: undefined,
        });
      } else {
        if (email && localData.email !== email) {
          await signOut();
          localStorage.removeItem(email);
          router.push('/');
          return;
        }
        if (JSON.stringify(data) !== JSON.stringify(localData)) {
          setData(localData);
        }
      }
    })();
  }, [getSession, signOut, router, setDataWithStorage, data]);
  return (
    <DataContext.Provider value={{ data, getSession, setName, setBirth }}>
      {children}
    </DataContext.Provider>
  );
};
