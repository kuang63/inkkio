import { create } from "zustand";

export const useCardStore = create((set) => ({
    pages: [
        { id: 0, bgColor: "#ffffff", bgTexture: "", objects: [] }, 
        { id: 1, bgColor: "#ffffff", bgTexture: "", objects: [] }, 
        { id: 2, bgColor: "#ffffff", bgTexture: "", objects: [] }, 
        { id: 3, bgColor: "#ffffff", bgTexture: "", objects: [] }, 
    ],
    currentPage: 0,

    setPage: (pageId) => set({currentPage: pageId}),

    setBgColor: (pageId, color) => 
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                ? {
                    ...page, 
                    bgColor: color                    
                }
                : page 
            ),   
        })),

    setBgTexture: (pageId, object) => 
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                ? {
                    ...page, 
                    bgTexture: object                    
                }
                : page 
            ),   
        })),

    addObject: (pageId, object) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                ? {
                    ...page,
                    objects: [...page.objects, object],
                    }
                : page
            ),
        })),

    updateObject: (pageId, objectId, updates) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                ? {
                    ...page,
                    objects: page.objects.map((obj) =>
                        obj.id === objectId
                        ? { ...obj, ...updates }
                        : obj
                    ),
                    }
                : page
            ),
        })),

    removeObject: (pageId, objectId) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                ? {
                    ...page,
                    objects: page.objects.filter((obj) => obj.id !== objectId),
                    }
                : page
            ),
        })),
}));
