export  interface  NavigationItemModel {
    key: string;
    alias: string;
    id: string;
    name: string;
    description: string;
    container: string;
    priority: string;
    itemType: string;
    customURL: string;
    iconClass: string;
    target: string;
    targetURL: string;
    severety: string;
    userCommand: string;
    navigationItems: Array<NavigationItemModel>;
};