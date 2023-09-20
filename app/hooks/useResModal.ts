import {create} from 'zustand';

interface ResModalStore{

    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


const useResModal = create<ResModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useResModal;