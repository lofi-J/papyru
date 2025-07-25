use rusqlite::{Connection, Result};
use tauri::{async_runtime::Mutex, State};

use crate::{
    model::note::{MutationResult, Note, NoteListItem, ToggleFavoriteResult},
    service::note::{get_all_notes, get_note_by_id, toggle_favorite},
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

// 기존 노트들의 folder_id를 NULL로 업데이트 (orphaned notes 수정)
#[tauri::command]
pub async fn fix_orphaned_notes_command(
    connection: State<'_, Mutex<Connection>>,
) -> Result<i64, String> {
    let conn = connection.lock().await;

    match conn.execute(
        "UPDATE notes SET folder_id = NULL 
         WHERE folder_id IS NOT NULL 
         AND folder_id NOT IN (SELECT id FROM folders WHERE deleted_at IS NULL)",
        [],
    ) {
        Ok(affected_rows) => {
            println!("✅ 고아 노트 수정 완료: {} 개", affected_rows);
            Ok(affected_rows as i64)
        }
        Err(e) => {
            eprintln!("❌ 고아 노트 수정 실패: {}", e);
            Err(format!("고아 노트를 수정할 수 없습니다: {}", e))
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

#[tauri::command]
pub async fn toggle_favorite_command(
    connection: State<'_, Mutex<Connection>>,
    note_id: i64,
) -> Result<MutationResult<ToggleFavoriteResult>, String> {
    let conn = connection.lock().await;

    match toggle_favorite(&*conn, note_id) {
        Ok(result) => {
            println!(
                "✅ 즐겨찾기 토글 성공: 노트 ID {}, 현재: {}",
                result.note_id, result.is_favorite
            );

            Ok(MutationResult {
                success: true,
                message: format!(
                    "즐겨찾기가 {}로 변경되었습니다",
                    if result.is_favorite {
                        "추가"
                    } else {
                        "해제"
                    }
                ),
                data: Some(result),
                error: None,
            })
        }
        Err(e) => {
            eprintln!("❌ 즐겨찾기 토글 실패: {}", e);

            Ok(MutationResult {
                success: false,
                message: "즐겨찾기 토글에 실패했습니다".to_string(),
                data: None,
                error: Some(format!("즐겨찾기 토글 실패: {}", e)),
            })
        }
    }
}
