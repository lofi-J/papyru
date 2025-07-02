use rusqlite::{Connection, Result};
use tauri::{async_runtime::Mutex, State};

use crate::{model::NoteListItem, service::note::get_all_notes};

#[tauri::command]
pub async fn get_note_list(
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
