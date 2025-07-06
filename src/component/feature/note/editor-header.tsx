type EditorHeaderProps = { title?: string };
export const EditorHeader = ({ title }: EditorHeaderProps) => {
  return (
    <div className="f-r items-center w-full">
      <span className="text-caption-b text-gray-500">{title}</span>
      <div>test</div>
    </div>
  );
};
