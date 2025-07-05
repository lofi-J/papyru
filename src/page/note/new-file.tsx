import FileLayout from '@/component/layout/note/file-layout';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function NewFilePage() {
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
    <FileLayout>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </FileLayout>
  );
}
