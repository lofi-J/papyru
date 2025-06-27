use std::sync::Mutex;

use tauri::Manager;
mod constance;
mod db;

use db::db::*;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let connection = initial_database(app.app_handle())?;
            app.manage(Mutex::new(connection)); // tauri 앱 내에서 공유 가능하도록 관리(전역 상태)
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
