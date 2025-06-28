use std::sync::Mutex;

use tauri::Manager;
mod constance;
mod db;

use db::{db::*, debug::check_database_status};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 데이터베이스 상태 확인 커맨드 추가 (디버그용)
#[tauri::command]
fn get_db_status(app_handle: tauri::AppHandle) -> Result<String, String> {
    let connection_mutex = app_handle.state::<Mutex<rusqlite::Connection>>();
    let connection = connection_mutex.lock().unwrap();

    match check_database_status(&*connection) {
        Ok(_) => Ok("Database is healthy".to_string()),
        Err(e) => Err(format!("Database error: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let connection = migration_database(app.app_handle())?;
            app.manage(Mutex::new(connection)); // tauri 앱 내에서 공유 가능하도록 관리(전역 상태)
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_db_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
