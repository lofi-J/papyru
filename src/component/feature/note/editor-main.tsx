import { PropsWithChildren } from 'react';

export default function EditorMain({ children }: PropsWithChildren) {
  return (
    <div data-editor="true" className="w-full h-full editor-main">
      {children}
    </div>
  );
}
