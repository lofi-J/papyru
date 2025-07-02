use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Note {
    pub id: i64,
    pub title: String,
    pub body: String,
    pub folder_id: Option<i64>,
    pub tags: String, // JSON 배열 문자열
    pub sort_order: i64,
    pub parent_note_id: Option<i64>,
    pub is_pinned: bool,
    pub is_favorite: bool,
    pub word_count: i64,
    pub mood: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NoteListItem {
    pub id: i64,
    pub title: String,
    pub folder_id: Option<i64>,
    pub is_pinned: bool,
    pub is_favorite: bool,
    pub word_count: i64,
    pub updated_at: String,
}
