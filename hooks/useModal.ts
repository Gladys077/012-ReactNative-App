import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export default function useModal() {
  return useContext(ModalContext);
}


// MODO DE USO:
// const { openModal, closeModal } = useModal();
