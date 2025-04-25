// import { LocalizationProvider } from '@mui/x-date-pickers';
import { FC, PropsWithChildren, createContext } from 'react';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface ILocalFormContext {
  isLoading?: boolean;
}
export const localFormContext = createContext<ILocalFormContext>({});

export interface LocalFormProviderProps {
  value: ILocalFormContext;
}
const LocalFormProvider: FC<PropsWithChildren<LocalFormProviderProps>> = ({
  children,
  value,
}) => {
  return (
    <localFormContext.Provider value={value}>
      {children}
    </localFormContext.Provider>
  );
};

export default LocalFormProvider;
