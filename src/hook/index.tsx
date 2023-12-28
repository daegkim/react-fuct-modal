import { useContext } from 'react';
import FuctModalContext from '../context';

function useFuctModal() {
  const { openModal, closeModal } = useContext(FuctModalContext);

  return { openModal, closeModal };
}

export default useFuctModal;
