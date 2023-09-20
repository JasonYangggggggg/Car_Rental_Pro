import {create} from 'zustand';

interface SearchStore {

    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}


const useSearchModal = create<SearchStore>((set)=> ({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false}),
}));

export default useSearchModal;