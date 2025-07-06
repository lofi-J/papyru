import Editor from '@/feature/note/editor';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function NewNotePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title] = useState(searchParams.get('title') || '');

  useEffect(() => {
    if (title) {
      setSearchParams({ title });
    } else {
      searchParams.delete('title');
      setSearchParams(searchParams);
    }
  }, [title, setSearchParams, searchParams]);

  return <Editor />;
}
