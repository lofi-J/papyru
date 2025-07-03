// src-tauri/src/model/tree.rs
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, Clone, TS)]
#[ts(export)]
#[serde(tag = "type")]
pub enum TreeNodeType {
    #[serde(rename = "folder")]
    Folder {
        id: i64,
        name: String,
        parent_id: Option<i64>,
        children_count: i64, // 자식 폴더 + 노트 개수
        updated_at: String,
    },
    #[serde(rename = "note")]
    Note {
        id: i64,
        title: String,
        folder_id: Option<i64>,
        parent_note_id: Option<i64>,
        is_pinned: bool,
        is_favorite: bool,
        word_count: i64,
        updated_at: String,
    },
}

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct TreeNode {
    #[serde(flatten)]
    pub node: TreeNodeType,
    pub children: Vec<TreeNode>,
}

// 플랫 리스트용 (성능 최적화)
#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FlatTreeNode {
    #[serde(flatten)]
    pub node: TreeNodeType,
    pub depth: i32,
    pub has_children: bool,
    pub is_expanded: bool, // 프론트엔드에서 관리하지만 초기값 제공
}

// 폴더 전용 조회용
#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FolderItem {
    pub id: i64,
    pub name: String,
    pub parent_id: Option<i64>,
    pub children_count: i64,
    pub updated_at: String,
}

// 노트 전용 조회용
#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct NoteItem {
    pub id: i64,
    pub title: String,
    pub folder_id: Option<i64>,
    pub parent_note_id: Option<i64>,
    pub is_pinned: bool,
    pub is_favorite: bool,
    pub word_count: i64,
    pub updated_at: String,
}
