import { useParams } from 'react-router';

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Note Detail</h1>
      <p className="text-gray-600">Note ID: {id}</p>
    </div>
  );
}