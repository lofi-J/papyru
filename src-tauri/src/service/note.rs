use rusqlite::{Connection, Result};

use crate::model::{Note, NoteListItem};

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
            id: row.get(0)?,
            title: row.get(1)?,
            folder_id: row.get(2)?,
            is_pinned: row.get(3)?,
            is_favorite: row.get(4)?,
            word_count: row.get(5)?,
            updated_at: row.get(6)?,
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
            id: row.get(0)?,
            title: row.get(1)?,
            body: row.get(2)?,
            folder_id: row.get(3)?,
            tags: row.get(4)?,
            sort_order: row.get(5)?,
            parent_note_id: row.get(6)?,
            is_pinned: row.get(7)?,
            is_favorite: row.get(8)?,
            word_count: row.get(9)?,
            mood: row.get(10)?,
            created_at: row.get(11)?,
            updated_at: row.get(12)?,
        })
    })?;

    match note_iter.next() {
        Some(note) => Ok(Some(note?)),
        None => Ok(None),
    }
}
