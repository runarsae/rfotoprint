import printing from '../../../../img/photo-services/printing.jpg';
import passport_photo from '../../../../img/photo-services/passport_photo.jpg';
import retouching from '../../../../img/photo-services/retouching.jpg';
import negatives from '../../../../img/photo-services/negatives.jpg';
import resize from '../../../../img/photo-services/resize.jpg';
import scanning from '../../../../img/photo-services/scanning.jpg';
import { useSetRecoilState } from 'recoil';
import { sidebarOpenState, SidebarType, sidebarTypeState } from '../../../../state/home/sidebar';
import { popupOpenState, PopupType, popupTypeState } from '../../../../state/home/popup';
import TextButton from '../../../common/TextButton';

interface PhotoService {
    title: string;
    image: string;
    description: React.ReactNode;
    price?: string;
    priceOnClick?: () => void;
}

function getPhotoServices(): PhotoService[] {
    const setSidebarType = useSetRecoilState(sidebarTypeState);
    const setSidebarOpen = useSetRecoilState(sidebarOpenState);

    const setPopupType = useSetRecoilState(popupTypeState);
    const setPopupOpen = useSetRecoilState(popupOpenState);

    return [
        {
            title: 'Utskrift',
            image: printing,
            description: 'Bildeutskrift fra e-post, minnebrikke, minnepenn, CD og mobil.',
            priceOnClick: () => {
                setSidebarType(SidebarType.PriceList);
                setSidebarOpen(true);
            }
        },
        {
            title: 'Passfoto',
            image: passport_photo,
            description: 'Passfoto tas til nødpass, visum, ledsagerbevis, bankkort etc.',
            price: 'Kr 250,-'
        },
        {
            title: 'Lysbilder, negativer og glassplater',
            image: negatives,
            description:
                'Overføring av lysbilder, negativer og glassplater til digitale bilder i høy oppløsning.',
            price: 'Pris etter avtale'
        },
        {
            title: 'Forstørring',
            image: resize,
            description: 'Forstørring av bilder opp til A3-størrelse.',
            priceOnClick: () => {
                setSidebarType(SidebarType.PriceList);
                setSidebarOpen(true);
            }
        },
        {
            title: 'Skanning',
            image: scanning,
            description: 'Skanning av gamle og nye bilder til digitalt format.',
            price: 'Kr 65,- pr. stk'
        },
        {
            title: 'Retusjering',
            image: retouching,
            description: (
                <>
                    Fjerning av bretter, skader, striper og lignende. Se{' '}
                    <TextButton
                        onClick={() => {
                            setPopupType(PopupType.RetouchingExamples);
                            setPopupOpen(true);
                        }}
                    >
                        eksempler
                    </TextButton>
                    .
                </>
            ),
            price: 'Pris etter avtale, fra kr 65,-'
        }
    ];
}

export default getPhotoServices;
