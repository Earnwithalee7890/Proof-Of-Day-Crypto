/**
 * Navigation related types
 */

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  roles?: string[];
  external?: boolean;
  disabled?: boolean;
}

export interface Breadcrumb {
  label: string;
  path: string;
  active?: boolean;
}

export interface RouteConfig {
  path: string;
  component: string;
  layout?: string;
  authRequired?: boolean;
  rolesRequired?: string[];
  meta?: RouteMeta;
}

export interface RouteMeta {
  title: string;
  description?: string;
  ogImage?: string;
  keywords?: string[];
}

export type NavigationEvent = {
  type: 'push' | 'replace' | 'back' | 'forward';
  from: string;
  to: string;
  timestamp: number;
};

export interface MenuConfig {
  header: NavItem[];
  sidebar: NavItem[];
  footer: {
    columns: {
      title: string;
      items: NavItem[];
    }[];
    socials: NavItem[];
  };
}
