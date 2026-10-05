import {
   BookOpenIcon,
   CircleHelpIcon,
   ClipboardCheckIcon,
   CreditCardIcon,
   FileTextIcon,
   LayersIcon,
   LayoutDashboardIcon,
   TagIcon,
   UploadIcon,
   UsersIcon,
   type LucideIcon,
} from 'lucide-react';

export interface NavItem {
   title: string;
   href: string;
   icon: LucideIcon;
}

export interface NavGroup {
   label: string;
   items: NavItem[];
}

// Single source for the sidebar and the header title. Mirrors the PRD admin modules.
export const NAV_GROUPS: NavGroup[] = [
   {
      label: 'Overview',
      items: [{ title: 'Dashboard', href: '/', icon: LayoutDashboardIcon }],
   },
   {
      label: 'Curriculum',
      items: [
         { title: 'Modules', href: '/modules', icon: BookOpenIcon },
         { title: 'Units', href: '/units', icon: LayersIcon },
         { title: 'Lessons', href: '/lessons', icon: FileTextIcon },
      ],
   },
   {
      label: 'Assessment',
      items: [
         { title: 'Question Bank', href: '/questions', icon: CircleHelpIcon },
         { title: 'Quizzes', href: '/quizzes', icon: ClipboardCheckIcon },
         { title: 'Bulk Import', href: '/import', icon: UploadIcon },
      ],
   },
   {
      label: 'Business',
      items: [
         { title: 'Users', href: '/users', icon: UsersIcon },
         { title: 'Plans & Prices', href: '/plans', icon: TagIcon },
         { title: 'Payments', href: '/payments', icon: CreditCardIcon },
      ],
   },
];

export function findNavItem(pathname: string): NavItem | undefined {
   const items = NAV_GROUPS.flatMap((group) => group.items);
   return items.find((item) => (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)));
}
