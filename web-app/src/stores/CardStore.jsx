import { create } from "zustand";

export const useCardStore = create((set) => ({
    pages: [
        { id: 0, objects: [] }, 
        { id: 1, objects: [] }, 
        { id: 2, objects: [] }, 
        { id: 3, objects: [] }, 
    ],
    currentPage: 0,

    setPage: (pageId) => set({currentPage: pageId}),

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
        }
    )),

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
        }
    )),

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
        }
    )),
}));
