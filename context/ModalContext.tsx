import React, { createContext, useState } from "react";
import { ModalOptions, ModalType } from "../types/modalTypes";

interface ModalContextValue {
  visible: boolean;
  type: ModalType;
  options: ModalOptions | null;
  openModal: (type: ModalType, options: ModalOptions) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
  visible: false,
  type: "alert",
  options: null,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("alert");
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const openModal = (type: ModalType, options: ModalOptions) => {
    setModalType(type);
    setModalOptions(options);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{
        visible,
        type: modalType,
        options: modalOptions,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
