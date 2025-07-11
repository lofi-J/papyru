use rusqlite::{Connection, Result};

use crate::model::note::{Note, NoteListItem, ToggleFavoriteResult};

// 삭제되지 않은 모든 노트(단순화 노트) 조회
pub fn get_all_notes(connection: &Connection) -> Result<Vec<NoteListItem>> {
    let mut stmt = connection.prepare(
        "
  SELECT id, title, folder_id, is_pinned, is_favorite, word_count, updated_at FROM notes
  WHERE deleted_at IS NULL 
  ORDER BY is_pinned DESC, updated_at DESC
  ",
    )?;

    let notes_iter = stmt.query_map([], |row| {
        Ok(NoteListItem {
            id: row.get("id")?,
            title: row.get("title")?,
            folder_id: row.get("folder_id")?,
            is_pinned: row.get("is_pinned")?,
            is_favorite: row.get("is_favorite")?,
            word_count: row.get("word_count")?,
            updated_at: row.get("updated_at")?,
        })
    })?;

    let mut notes: Vec<NoteListItem> = vec![];

    for note in notes_iter {
        notes.push(note?);
    }

    Ok(notes)
}

// 노트 상세 조회
pub fn get_note_by_id(connection: &Connection, note_id: i64) -> Result<Option<Note>> {
    let mut stmt = connection.prepare(
        "SELECT id, title, body, folder_id, tags, sort_order, parent_note_id, 
              is_pinned, is_favorite, word_count, mood, created_at, updated_at
       FROM notes 
       WHERE id = ? AND deleted_at IS NULL",
    )?;

    let mut note_iter = stmt.query_map([note_id], |row| {
        Ok(Note {
            id: row.get("id")?,
            title: row.get("title")?,
            body: row.get("body")?,
            folder_id: row.get("folder_id")?,
            tags: row.get("tags")?,
            sort_order: row.get("sort_order")?,
            parent_note_id: row.get("parent_note_id")?,
            is_pinned: row.get("is_pinned")?,
            is_favorite: row.get("is_favorite")?,
            word_count: row.get("word_count")?,
            mood: row.get("mood")?,
            created_at: row.get("created_at")?,
            updated_at: row.get("updated_at")?,
        })
    })?;

    match note_iter.next() {
        Some(note) => Ok(Some(note?)),
        None => Ok(None),
    }
}

// 노트 즐겨찾기 토글
pub fn toggle_favorite(connection: &Connection, note_id: i64) -> Result<ToggleFavoriteResult> {
    // 현재 즐겨찾기 상태 조회
    let current_favorite: bool = connection.query_row(
        "SELECT is_favorite FROM notes WHERE id = ? AND deleted_at IS NULL",
        [note_id],
        |row| row.get(0),
    )?;

    // 토글된 상태로 업데이트
    let new_favorite = !current_favorite;
    connection.execute(
        "UPDATE notes SET is_favorite = ? WHERE id = ? AND deleted_at IS NULL",
        [new_favorite as i64, note_id], // rusqlite는 boolean을 i64로 처리
    )?;

    Ok(ToggleFavoriteResult {
        note_id,
        is_favorite: new_favorite,
    })
}
