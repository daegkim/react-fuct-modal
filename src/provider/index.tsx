import { CSSProperties, PropsWithChildren, ReactNode, cloneElement, useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import FuctModalContext from '../context';

interface FuctModal {
  uid: string;
  component: JSX.Element;
}

interface FuctModalProviderProps {
  modalAreaId?: string;
  modalLayout?: ReactNode;
  zIndex?: CSSProperties['zIndex'];
}

function FuctModalProvider({
  modalAreaId = 'fuct-modal-area',
  zIndex = 1000,
  children,
}: PropsWithChildren<FuctModalProviderProps>) {
  const [modals, setModals] = useState<FuctModal[]>([]);

  const openModal = useCallback((component: JSX.Element) => {
    const uid = uuid();
    setModals((prev) => [
      ...prev,
      ...[
        {
          uid,
          component: cloneElement(component, {
            uid,
            closeModal,
          }),
        },
      ],
    ]);
    return uid;
  }, []);

  const closeModal = useCallback((uid: string) => {
    setModals((prev) => {
      const targetIndex = prev.findIndex((modal) => modal.uid === uid);
      if (targetIndex === -1) {
        return prev;
      }

      const newModals = [...prev];
      newModals.splice(targetIndex, 1);
      return newModals;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal]
  );

  return (
    <FuctModalContext.Provider value={contextValue}>
      <>{children}</>
      {modals.length > 0 ? (
        <div id={modalAreaId} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {modals.map((modal, index) => (
            <div
              key={modal.uid}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: `${Number(zIndex || 0) + index}`,
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                key={modal.uid}
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  top: `calc(50% + ${index * 10}px)`,
                  left: `calc(50% + ${index * 10}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {modal.component}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </FuctModalContext.Provider>
  );
}

export default FuctModalProvider;
