'use client';

import { File, Folder, Tree } from '@/components/ui/file-tree';
import { Link, usePathname } from '@/navigation';
import { BookMarked, BookDown, Bot, Goal, Orbit, Notebook, LibraryBig } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface TreeItem {
  id: string;
  name: string;
  path: string;
  icon?: React.ReactNode;
  children?: TreeItem[];
}

const findItemByPath = (items: TreeItem[], path: string): TreeItem | null => {
  for (const item of items) {
    if (item.path === path) return item;
    if (item.children) {
      const found = findItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
};

const getAllIds = (items: TreeItem[]): string[] =>
  items.reduce((acc: string[], item) => {
    acc.push(item.id);
    if (item.children) {
      acc.push(...getAllIds(item.children));
    }
    return acc;
  }, []);

const renderTreeItems = (items: TreeItem[]) =>
  items.map((item) => {
    if (item.children) {
      return (
        <Folder
          key={item.id}
          element={
            <Link
              href={item.path}
              className="block rounded-md px-2 py-1 text-left hover:bg-accent/30"
            >
              {item.name}
            </Link>
          }
          value={item.id}
        >
          {renderTreeItems(item.children)}
        </Folder>
      );
    }
    return (
      <File key={item.id} value={item.id} fileIcon={item.icon}>
        <Link href={item.path} className="block rounded-md px-2 py-1 text-left hover:bg-accent/30">
          {item.name}
        </Link>
      </File>
    );
  });

export default function SheetNavigation() {
  const t = useTranslations('Navigation');
  const navigationData: TreeItem[] = [
    {
      id: '1',
      name: t('webinars'),
      path: '/webinars',
      children: [
        {
          id: '2',
          name: t('fundamentals-of-ai.title'),
          path: '/fundamentals-of-ai',
          children: [
            {
              id: '3',
              name: t('fundamentals-of-ai.introduction'),
              path: '/fundamentals-of-ai/introduction',
              icon: <Orbit size={20} />,
            },
            {
              id: '4',
              name: t('fundamentals-of-ai.eu-ai-act'),
              path: '/fundamentals-of-ai/eu-ai-act',
              icon: <Bot size={20} />,
            },
            {
              id: '5',
              name: t('fundamentals-of-ai.open-questions'),
              path: '/fundamentals-of-ai/open-questions',
              icon: <Goal size={20} />,
            },
          ],
        },
        {
          id: '6',
          name: t('gen-ai-and-critical-ai-literacy.title'),
          path: '/gen-ai-and-critical-ai-literacy',
          children: [
            {
              id: '7',
              name: t('gen-ai-and-critical-ai-literacy.area'),
              path: '/gen-ai-and-critical-ai-literacy/area',
              icon: <Orbit size={20} />,
            },
            {
              id: '8',
              name: t('gen-ai-and-critical-ai-literacy.specifics'),
              path: '/gen-ai-and-critical-ai-literacy/specifics',
              icon: <Bot size={20} />,
            },
            {
              id: '9',
              name: t('gen-ai-and-critical-ai-literacy.impact'),
              path: '/gen-ai-and-critical-ai-literacy/impact',
              icon: <Goal size={20} />,
            },
          ],
        },
        {
          id: '10',
          name: t('algorithms-in-e-recruiting-software.title'),
          path: '/algorithms-in-e-recruiting-software',
          children: [
            {
              id: '11',
              name: t('algorithms-in-e-recruiting-software.area'),
              path: '/algorithms-in-e-recruiting-software/area',
              icon: <Orbit size={20} />,
            },
            {
              id: '12',
              name: t('algorithms-in-e-recruiting-software.specifics'),
              path: '/algorithms-in-e-recruiting-software/specifics',
              icon: <Bot size={20} />,
            },
            {
              id: '13',
              name: t('algorithms-in-e-recruiting-software.impact'),
              path: '/algorithms-in-e-recruiting-software/impact',
              icon: <Goal size={20} />,
            },
          ],
        },
        {
          id: '14',
          name: t('ai-tutors-between-equality-and-inequality.title'),
          path: '/ai-tutors-between-equality-and-inequality',
          children: [
            {
              id: '15',
              name: t('ai-tutors-between-equality-and-inequality.introduction'),
              path: '/ai-tutors-between-equality-and-inequality/introduction',
              icon: <Orbit size={20} />,
            },
            {
              id: '16',
              name: t('ai-tutors-between-equality-and-inequality.specifics'),
              path: '/ai-tutors-between-equality-and-inequality/specifics',
              icon: <Bot size={20} />,
            },
            {
              id: '17',
              name: t('ai-tutors-between-equality-and-inequality.implications'),
              path: '/ai-tutors-between-equality-and-inequality/implications',
              icon: <Goal size={20} />,
            },
          ],
        },
        {
          id: '18',
          name: t('memoryquiz.title'),
          path: '/memoryquiz',
          icon: <BookMarked size={20} />,
        },
      ],
    },
    {
      id: '18',
      name: t('materials'),
      path: '/materials',
      children: [
        {
          id: '19',
          name: t('material1.title'),
          path: '/material1',
          icon: <LibraryBig size={20} className="flex-shrink-0" />,
        },
        {
          id: '20',
          name: t('material2.title'),
          path: '/material2',
          icon: <LibraryBig size={20} className="flex-shrink-0" />,
        },
        {
          id: '21',
          name: t('material3.title'),
          path: '/material3',
          icon: <LibraryBig size={20} className="flex-shrink-0" />,
        },
        {
          id: '22',
          name: t('material4.title'),
          path: '/material4',
          icon: <LibraryBig size={20} className="flex-shrink-0" />,
        },
      ],
    },
    {
      id: '23',
      name: t('curriculum.title'),
      path: '/curriculum',
      icon: <Notebook size={20} className="flex-shrink-0" />,
    },
  ];

  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/[a-z]{2}/, ''); // Remove language prefix
  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const item = findItemByPath(navigationData, id);
    if (item) {
      // Navigate to the selected item's path
      window.location.href = item.path;
    }
  };

  return (
    <Tree
      initialSelectedId={selectedId}
      initialExpandedItems={getAllIds(navigationData)}
      openIcon={<BookMarked size={20} />}
    >
      {renderTreeItems(navigationData)}
    </Tree>
  );
}
