
export interface IRequestItem {
  id: string;
  user: {
    name: string;
    request: string;
  };
  date: string;
  time: string;
  content: string;
}

export interface IData {
  id: string;
  user: {
    name: string;
    request: string;
  };
  date: string;
  time: string;
  content: string;
  status: boolean;
}

export interface INavigationProps {
  navigation: any;
  route: {
    params: any;
  };
}

export interface IPopoverItem {
  Date: string;
  Body: string;
  Id: string;
}

export interface IPopOverGroup {
  groupIcon: string;
  groupTitle: string;
  groupId: string;
  notifications: IPopoverItem[];
}
[];
