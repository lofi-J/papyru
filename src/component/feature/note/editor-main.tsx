import { PropsWithChildren } from 'react';

export default function EditorMain({ children }: PropsWithChildren) {
  return (
    <div data-selectable="true" className="w-full h-full">
      {children}
    </div>
  );
}
