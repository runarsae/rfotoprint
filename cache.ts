import { makeVar } from '@apollo/client';

export type Pages = 'hjem' | 'fototjenester' | 'kontorrekvisita' | 'diverse';

export const currentPageVar = makeVar<Pages>('hjem');
