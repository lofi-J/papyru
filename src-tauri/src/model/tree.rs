pub enum FileTreeNodeEnum {
    Folder(),
    Note(),
}

pub struct FileTreeNode {
    pub id: String,
    pub node_type: FileTreeNode,
    pub children: Vec<FileTreeNode>,
}

// TODO: 트리 구조 추가
