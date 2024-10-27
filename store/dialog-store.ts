// useDialogStore.ts
import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
  handleOpenChange: (isOpen: boolean) => void
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  toggleDialog: () => set((state) => ({ isOpen: !state.isOpen })),
  handleOpenChange: (isOpen) => set({ isOpen: isOpen })
}));

export default useDialogStore;
