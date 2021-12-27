import { atom } from 'recoil';

export enum SidebarType {
    Navigation,
    PriceListPrinting,
    PriceListResizing
}

export const sidebarOpenState = atom<boolean>({
    key: 'sidebarOpenState',
    default: false
});

export const sidebarTypeState = atom<SidebarType | null>({
    key: 'sidebarTypeState',
    default: null
});
