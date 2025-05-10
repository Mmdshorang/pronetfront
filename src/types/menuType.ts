import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface MenuItem {
  id?: string;
  title?: string;
  text?: string;
  accessKey?: string;
  items?: MenuItem[];
  path?: string;
  icon?: ReactNode | IconType;
  children?: MenuItem[];
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
} 