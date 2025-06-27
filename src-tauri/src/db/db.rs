use crate::constance::{db::DB_NAME, sql::SQL_CREATE_TABLE_NOTES};
use rusqlite::{Connection, Result};
use std::fs;
use tauri::Manager;

/**
 * 데이터베이스 초기화
 * path: 운영체제의 표준 규칙을 따라 데이터베이스 파일 생성
 * Windows: C:\Users\{username}\AppData\Roaming\{app_name}
 * macOS: ~/Library/Application Support/{app_name}
 */
pub fn initial_database(app_handle: &tauri::AppHandle) -> Result<Connection> {
    let app_dir = app_handle.path().app_data_dir().unwrap();

    // 디렉토리가 존재하지 않으면 생성
    if !app_dir.exists() {
        fs::create_dir_all(&app_dir).expect("Failed to create app data directory");
    }

    let db_path = app_dir.join(DB_NAME);

    let connection = Connection::open(db_path).expect("Failed to open database");
    connection.execute(SQL_CREATE_TABLE_NOTES, [])?;

    Ok(connection)
}
