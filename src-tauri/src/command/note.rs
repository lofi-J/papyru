use rusqlite::{Connection, Result};
use tauri::{async_runtime::Mutex, State};

use crate::{
    model::{Note, NoteListItem},
    service::note::{get_all_notes, get_note_by_id},
};

#[tauri::command]
pub async fn get_note_list_command(
    connection: State<'_, Mutex<Connection>>,
) -> Result<Vec<NoteListItem>, String> {
    let conn = connection.lock().await;

    // note list 조회 함수 사용
    match get_all_notes(&*conn) {
        Ok(notes) => {
            println!("✅ 노트 목록 조회 성공: {} 개", notes.len());
            Ok(notes)
        }
        Err(e) => {
            eprintln!("❌ 노트 목록 조회 실패: {}", e);
            Err(format!("노트 목록을 조회할 수 없습니다: {}", e))
        }
    }
}

#[tauri::command]
pub async fn get_note_by_id_command(
    connection: State<'_, Mutex<Connection>>,
    note_id: i64,
) -> Result<Note, String> {
    let conn = connection.lock().await;

    match get_note_by_id(&*conn, note_id) {
        Ok(Some(note)) => {
            println!("✅ 노트 상세 조회 성공: {}", note.title);
            Ok(note)
        }
        Ok(None) => {
            eprintln!(
                "❌ 노트 상세 조회 실패: 노트를 찾을 수 없습니다 (ID: {})",
                note_id
            );
            Err(format!("노트를 찾을 수 없습니다 (ID: {})", note_id))
        }
        Err(error) => {
            eprintln!("❌ 노트 상세 조회 실패: {}", error);
            Err(format!("노트 상세를 조회할 수 없습니다: {}", error))
        }
    }
}
