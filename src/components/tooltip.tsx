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
  const tooltipClassName = `tooltip tooltip-${"bottom"}`

  return (
    <div className={tooltipClassName + "z-50"} data-tip={`${title}`}>
      {children}
    </div>
  );
};
