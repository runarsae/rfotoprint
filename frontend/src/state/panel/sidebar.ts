import { atom } from 'recoil';

export enum SidebarType {
    Navigation,
    PriceList
}

export const sidebarOpenState = atom<boolean>({
    key: 'panelSidebarOpenState',
    default: false
});

export const sidebarTypeState = atom<SidebarType | null>({
    key: 'panelSidebarTypeState',
    default: null
});
