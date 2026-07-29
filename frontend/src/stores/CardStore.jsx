import { create } from 'zustand';

const useCardStore = create((set) => ({
    /* State for the card dimensions */
    designWidth: 1000,
    designHeight: 1400,
    pages: [
        {
            "page-number": 1,
            elements: []

        },
        {
            "page-number": 2,
            elements: []
        },
        {
            "page-number": 3,
            elements: []
        }, 
        {
            "page-number": 4,
            elements: []
        }
    ],
}));

export default useCardStore;