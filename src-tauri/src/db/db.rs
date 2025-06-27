use crate::constance::{db::DB_NAME, sql::SQL_CREATE_TABLE_NOTES};
use rusqlite::{Connection, Result};
use tauri::Manager;

/**
 * 데이터베이스 초기화
 * path: 운영체제의 표준 규칙을 따라 데이터베이스 파일 생성
 * Windows: C:\Users\{username}\AppData\Roaming\{app_name}
 * macOS: ~/Library/Application Support/{app_name}
 */
pub fn initial_database(app_handle: &tauri::AppHandle) -> Result<Connection> {
    let app_dir = app_handle.path().app_data_dir().unwrap();
    let db_path = app_dir.join(DB_NAME);

    let connection = Connection::open(db_path)?;
    connection.execute(SQL_CREATE_TABLE_NOTES, [])?;

    Ok(connection)
}
