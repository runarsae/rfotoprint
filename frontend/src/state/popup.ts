import { atom } from 'recoil';

export type PopupType = 'product-image' | 'retouching-examples';

export const popupOpenState = atom<boolean>({
    key: 'popupOpenState',
    default: false
});

export const popupTypeState = atom<PopupType | null>({
    key: 'popupTypeState',
    default: null
});
