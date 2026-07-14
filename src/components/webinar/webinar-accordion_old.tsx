'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface WebinarAccordionItemProps {
  id: string;
  isDefault?: boolean;
  title: string;
  content: any;
}

interface WebinarAccordionProps {
  items: WebinarAccordionItemProps[];
}

function FindDefaultItemId(items: WebinarAccordionItemProps[]): string {
  const defaultItem = items.find((item) => item.isDefault === true);
  if (defaultItem) return defaultItem.id;

  return items[0].id;
}
function WebinarAccordion({ items }: WebinarAccordionProps) {
  return (
    <div className="relative w-full shadow-lg drop-shadow-md">
      <div className="mt-4 flex flex-col">
        <Card className="flex-1 shadow-md drop-shadow-md">
          <CardContent className="p-4 text-sm sm:text-base lg:text-lg">
            <Accordion
              type="single"
              collapsible
              defaultValue={FindDefaultItemId(items)}
              className="space-y-8 lg:flex lg:h-full lg:flex-col"
            >
              {items
                && items.length > 0
                && items.map((item) => (
                  <Card className="rounded-md border border-t p-4 lg:flex-grow" key={item.id}>
                    <AccordionItem value={item.id} className="lg:h-full">
                      <AccordionTrigger className="p-4 text-lg font-semibold">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="lg:h-[calc(100%-8rem)]">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WebinarAccordion;
