'use client'
import React, { useCallback, useMemo, useState } from 'react';
import { DataTable } from '../table';
import { EMAIL_MARKETING_HEADER } from '@/constants/menu';
import { TableCell, TableRow } from '../ui/table';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { SideSheet } from '../sheet';
import Answers from './answers';

interface Customer {
  Domain: {
    name: string;
  } | null;
  id: string;
  email: string | null;
}

interface CustomerTableProps {
  domains: {
    customer: Customer[];
  }[];
  onSelect: (email: string) => void;
  select: string[];
  onId: (id: string) => void;
  id?: string;
}

const MemoizedTableRow = React.memo(({ 
  customer, 
  isSelected, 
  onSelect, 
  onId, 
  selectedId 
}: { 
  customer: Customer; 
  isSelected: boolean; 
  onSelect: (email: string) => void; 
  onId: (id: string) => void;
  selectedId?: string;
}) => {
  const handleSelect = useCallback(() => {
    if (customer.email) {
      onSelect(customer.email);
    }
  }, [customer.email, onSelect]);

  const handleViewClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onId(customer.id);
  }, [customer.id, onId]);

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <Card
          onClick={handleSelect}
          className={cn(
            'rounded-full w-5 h-5 border-4 cursor-pointer transition-colors',
            isSelected ? 'bg-orange' : 'bg-peach hover:bg-peach-dark'
          )}
          aria-label={isSelected ? 'Deselect customer' : 'Select customer'}
        />
      </TableCell>
      <TableCell className="font-medium">{customer.email}</TableCell>
      <TableCell>
        <SideSheet
          title="Customer Answers"
          description="Customer responses to bot questions"
          trigger={
            <Card
              className="bg-grandis py-2 px-4 cursor-pointer text-gray-700 hover:bg-orange transition-colors"
              onClick={handleViewClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleViewClick(e as any)}
            >
              View
            </Card>
          }
        >
          <Answers id={selectedId} />
        </SideSheet>
      </TableCell>
      <TableCell className="text-right">{customer.Domain?.name || '—'}</TableCell>
    </TableRow>
  );
});

MemoizedTableRow.displayName = 'MemoizedTableRow';

export const CustomerTable = React.memo(({
  domains,
  onSelect,
  select,
  onId,
  id,
}: CustomerTableProps) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>(id);

  // Flatten the nested customers array for easier rendering
  const customers = useMemo(() => {
    return domains.flatMap(domain => domain.customer);
  }, [domains]);

  const handleIdSelection = useCallback((customerId: string) => {
    setSelectedCustomerId(customerId);
    onId(customerId);
  }, [onId]);

  // Only re-render when necessary props change
  return (
    <div className="rounded-md border">
      <DataTable headers={EMAIL_MARKETING_HEADER}>
        {customers.map((customer) => (
          <MemoizedTableRow
            key={customer.id}
            customer={customer}
            isSelected={customer.email ? select.includes(customer.email) : false}
            onSelect={onSelect}
            onId={handleIdSelection}
            selectedId={selectedCustomerId}
          />
        ))}
      </DataTable>
    </div>
  );
});

CustomerTable.displayName = 'CustomerTable';