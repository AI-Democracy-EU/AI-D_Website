'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { WebinarResourceItems } from './webinar-types';

function WebinarResources({ items }: WebinarResourceItems) {
  return (
    <div>
      <div>
        {items
          && items.length > 0
          && items.map((item, index) => (
            <Link href={item.link} className="mb-4 block" key={index}>
              <Button className="w-full">{item.text}</Button>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default WebinarResources;
