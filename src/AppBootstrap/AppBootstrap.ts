import { TestNavigationDAL } from "../Navigation/DataAccessLayer/TestNavigationDAL";
import { DrawerContentFactory } from "../Navigation/NavigationViewModels/DrawerContentFactory";

export function AppBootspaper(initType: string) {
    switch (initType) {
        case 'test': {
            const _TestNavigationDAL = new TestNavigationDAL()
            const _DrawerContentFactory = new DrawerContentFactory(_TestNavigationDAL)
        };
        case 'real': {

        };
    }
};