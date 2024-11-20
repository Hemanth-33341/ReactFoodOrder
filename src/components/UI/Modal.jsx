import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
export function Modal({ children, open, onClose, className='' }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
        modal.showModal();
    }

    return ()=> modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
        {children}
        </dialog>,
    document.getElementById("modal")
  );
}
