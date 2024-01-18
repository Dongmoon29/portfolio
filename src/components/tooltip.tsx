import { FC } from 'react';

type TooltipProps = {
  children: React.ReactNode;
  title: string;
};

export const Tooltip: FC<TooltipProps> = ({ children, title }) => {
  return (
    <div className={'z-50 tooltip tooltip-right'} data-tip={`${title}`}>
      {children}
    </div>
  );
};
