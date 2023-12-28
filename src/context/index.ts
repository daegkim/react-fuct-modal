import { createContext } from 'react';

export interface FuctModalContextProps {
  openModal: (component: JSX.Element) => string;
  closeModal: (uid: string) => void;
}

const FuctModalContext = createContext<FuctModalContextProps>({
  openModal: () => '',
  closeModal: () => {},
});

export default FuctModalContext;
