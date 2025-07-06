import { PropsWithChildren } from 'react';

export default function EditorMain({ children }: PropsWithChildren) {
  return <div className="w-full h-full editor-main">{children}</div>;
}
