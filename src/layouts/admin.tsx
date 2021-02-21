import * as React from 'react';
import { Menu, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import AppRoutes, { AppRoute } from '../routes';
import { useAuth } from '../hooks/auth';

type AdminLayoutProps = {
  children: React.ReactNode,
};

function AdminLayout(props: AdminLayoutProps) {
  const auth = useAuth();

  async function handleSignOutButtonClick() {
    await auth.signOut();
    window.location.replace('/login');
  }

  function renderMenuItems(): React.ReactNode[] {
    return AppRoutes.filter((route: AppRoute): boolean => {
      return Boolean(route.label && route.icon);
    }).map((route: AppRoute, i: number) => {
      const ItemIcon = route.icon;

      return (
        <Menu.Item
          key={`${i}-${route.label}`}
          icon={<ItemIcon />}
        >
          {route.label}
        </Menu.Item>
      );
    });
  }

  return (
    <Layout data-cy="admin-layout">
      <Layout.Header className="admin-layout-header">
        <span className="layout-logo">PERFIL CIUDADANO</span>

        <button
          data-cy="signout-button"
          onClick={handleSignOutButtonClick}
          className="signout-button"
        >
          <LogoutOutlined size={20}/>
        </button>
      </Layout.Header>

      <Layout>
        <Layout.Sider>
          <div className="menu-container">
            <Menu data-cy="admin-sidebar-menu" theme="light">
              {renderMenuItems()}
            </Menu>
          </div>
        </Layout.Sider>
        <Layout.Content>
          {props.children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
