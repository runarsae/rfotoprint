import { atom } from 'recoil';

export enum PopupType {
    ProductImage = 'product-image'
}

export const popupOpenState = atom<boolean>({
    key: 'panelPopupOpenState',
    default: false
});

export const popupTypeState = atom<PopupType | null>({
    key: 'panelPopupTypeState',
    default: null
});
