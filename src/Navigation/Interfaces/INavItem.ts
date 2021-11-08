export interface INavItem {
    id: string;
    title: string;
    notify: (event: EventList, data: any) => void
};