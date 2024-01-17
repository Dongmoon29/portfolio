import { FC } from 'react';

type TooltipProps = {
  children: React.ReactNode;
  title: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  title,
  direction = 'right',
}) => {
  const tooltipClassName = direction
    ? `tooltip tooltip-${direction}`
    : 'tooltip';

  return (
    <div className={tooltipClassName} data-tip={`${title}`}>
      {children}
    </div>
  );
};
