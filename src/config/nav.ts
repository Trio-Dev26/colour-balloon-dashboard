import {
   BookIcon,
   ClipboardListIcon,
   FileQuestionMarkIcon,
   FolderOpenIcon,
   GraduationCapIcon,
   LayoutDashboardIcon,
   NotebookTextIcon,
   TagsIcon,
   type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export interface NavLink {
   title: string;
   href: string;
   icon: LucideIcon;
}

export interface NavGroup {
   title: string;
   icon: LucideIcon;
   children: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => 'children' in entry;

// Sidebar menu, matching the Figma admin layout. Users, Payments and Import routes exist
// but stay out of the menu until they are designed.
export const NAV_ENTRIES: NavEntry[] = [
   { title: 'Dashboard', href: ROUTES.dashboard, icon: LayoutDashboardIcon },
   {
      title: 'Curriculum management',
      icon: GraduationCapIcon,
      children: [
         { title: 'Module', href: ROUTES.modules, icon: FolderOpenIcon },
         { title: 'Unit', href: ROUTES.units, icon: BookIcon },
         { title: 'Lesson', href: ROUTES.lessons, icon: NotebookTextIcon },
         { title: 'Quiz', href: ROUTES.quizzes, icon: ClipboardListIcon },
         { title: 'Questions', href: ROUTES.questions, icon: FileQuestionMarkIcon },
      ],
   },
   { title: 'Plans & pricing', href: ROUTES.plans, icon: TagsIcon },
];

export function isActivePath(pathname: string, href: string): boolean {
   return href === ROUTES.dashboard ? pathname === href : pathname.startsWith(href);
}
