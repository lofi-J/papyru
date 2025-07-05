import { PropsWithChildren } from 'react';

type FileLayoutProps = PropsWithChildren & {};

export default function FileLayout({ children }: FileLayoutProps) {
  return (
    <div className="f-c items-start justify-start w-full select-text">
      {children}
    </div>
  );
}
