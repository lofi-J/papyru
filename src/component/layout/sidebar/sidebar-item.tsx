import { PropsWithChildren } from 'react';

export const SidebarItem = ({ children }: PropsWithChildren) => {
  return <button className="px-1 text-body-2 ghost-button">{children}</button>;
};
