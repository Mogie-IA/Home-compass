import { createContext, useCallback, useContext, useState } from 'react'

const ModalContext = createContext({ modal: null, openModal: () => {}, closeModal: () => {} })

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null) // null | 'pilot' | 'waitlist'
  const openModal = useCallback((name) => setModal(name), [])
  const closeModal = useCallback(() => setModal(null), [])
  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
