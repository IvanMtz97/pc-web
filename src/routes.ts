import * as React from 'react';
import AdminLayout from './layouts/admin';
import EmptyLayout from './layouts/empty';

import {
  ContactsOutlined,
} from '@ant-design/icons';

import Login from './views/login';
import StructPoll from './views/structPoll';
import Home from './views/home';

export type AppRoute = {
  path: string,
  component: React.ElementType,
  layout: React.ElementType,
  label?: string,
  public: boolean,
  roles?: string[],
  icon?: any,
};

export function getRedirectUrl(userType: string): string {
  if (['admin', 'pollster'].includes(userType)) {
    return '/encuesta_estructuras';
  }

  return '/login';
}

const AppRoutes: AppRoute[] = [
  {
    path: '/login',
    component: Login,
    layout: EmptyLayout,
    public: true,
  },
  {
    path: '/encuesta_estructuras',
    component: StructPoll,
    layout: AdminLayout,
    label: 'Encuesta estructuras',
    public: false,
    roles: ['admin', 'pollster'],
    icon: ContactsOutlined,
  },
  {
    path: '/',
    component: Home,
    layout: EmptyLayout,
    public: true,
  },
];

export default AppRoutes;