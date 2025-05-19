
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionLabel,
  actionLink,
  onActionClick,
  icon,
}) => {
  const ActionButton = () => (
    <Button
      className="whitespace-nowrap"
      onClick={onActionClick}
    >
      {actionLabel}
    </Button>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      {actionLabel && (actionLink ? (
        <Link to={actionLink}>
          <ActionButton />
        </Link>
      ) : onActionClick ? (
        <ActionButton />
      ) : null)}
    </div>
  );
};
