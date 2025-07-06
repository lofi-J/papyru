import Editor from '@/component/feature/note/editor';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function NewNotePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get('title') || '');
  // const [content, setContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  // title이 변경될 때마다 쿼리 스트링 업데이트
  useEffect(() => {
    if (title) {
      setSearchParams({ title });
    } else {
      searchParams.delete('title');
      setSearchParams(searchParams);
    }
  }, [title, setSearchParams, searchParams]);

  return (
    <Editor>
      <Editor.Header title={title} />
      {JSON.stringify(title)}
    </Editor>
  );
}
