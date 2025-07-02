use crate::constance::{db::DB_NAME, sql};
use rusqlite::{Connection, Result};
use std::fs;
use tauri::Manager;

// * 데이터베이스 마이크레이션 *
pub fn migration_database(app_handle: &tauri::AppHandle) -> Result<Connection> {
    // 데이터베이스 연결
    let connection = database_connection(app_handle)?;

    // SQLite 설정 최적화
    configure_sqlite(&connection)?;

    // 테이블 생성
    create_table(&connection)?;

    // 인덱스 생성
    create_index(&connection)?;

    // 트리거 생성
    create_triggers(&connection)?;

    Ok(connection)
}

/**
 * 데이터베이스 초기화
 * path: 운영체제의 표준 규칙을 따라 데이터베이스 파일 생성
 * Windows: C:\Users\{username}\AppData\Roaming\{app_name}
 * macOS: ~/Library/Application Support/{app_name}
 */
fn database_connection(app_handle: &tauri::AppHandle) -> Result<Connection> {
    println!("1. 데이터베이스 초기화 시작...");
    let app_dir = app_handle.path().app_data_dir().unwrap();

    // 디렉토리가 존재하지 않으면 생성
    if !app_dir.exists() {
        fs::create_dir_all(&app_dir).expect("Failed to create app data directory");
    }

    let db_path = app_dir.join(DB_NAME);
    println!("2. 데이터베이스 파일 경로: {}", db_path.display());

    let connection = Connection::open(db_path).expect("Failed to open database");
    println!("3. 데이터베이스 연결 성공");

    Ok(connection)
}

/// SQLite 설정 최적화
fn configure_sqlite(connection: &Connection) -> Result<()> {
    connection.execute_batch(
        "
        PRAGMA foreign_keys = ON;        -- 외래키 제약 조건 활성화
        PRAGMA journal_mode = WAL;       -- WAL 모드 (성능 향상)
        PRAGMA synchronous = NORMAL;     -- 동기화 레벨 조정
        PRAGMA cache_size = 1000;        -- 캐시 크기 설정
        PRAGMA temp_store = MEMORY;      -- 임시 저장소를 메모리에
    ",
    )?;

    println!("⚙️ SQLite 설정 최적화 완료");
    Ok(())
}

fn create_table(connection: &Connection) -> Result<()> {
    // 외래키 의존성 순서대로 테이블 생성
    connection.execute(sql::SQL_CREATE_TABLE_FOLDERS, [])?;
    println!("테이블 생성 완료: folders");
    connection.execute(sql::SQL_CREATE_TABLE_NOTES, [])?;
    println!("테이블 생성 완료: notes");
    connection.execute(sql::SQL_CREATE_TABLE_TAGS, [])?;
    println!("테이블 생성 완료: tags");
    connection.execute(sql::SQL_CREATE_TABLE_LINKS, [])?;
    println!("테이블 생성 완료: links");
    connection.execute(sql::SQL_CREATE_TABLE_NOTE_TAGS, [])?;
    println!("테이블 생성 완료: note_tags");
    connection.execute(sql::SQL_CREATE_TABLE_RECENT_ACTIVITIES, [])?;
    println!("테이블 생성 완료: recent_activities");

    Ok(())
}

fn create_index(connection: &Connection) -> Result<()> {
    println!("🔍 인덱스 생성 중...");

    let indexes = vec![ 
        // Folders 인덱스
        "CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON folders(parent_id)",
        "CREATE INDEX IF NOT EXISTS idx_folders_deleted_at ON folders(deleted_at)",
        
        // Notes 인덱스
        "CREATE INDEX IF NOT EXISTS idx_notes_folder_id ON notes(folder_id)",
        "CREATE INDEX IF NOT EXISTS idx_notes_parent_note_id ON notes(parent_note_id)",
        "CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at)",
        "CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at)",
        "CREATE INDEX IF NOT EXISTS idx_notes_deleted_at ON notes(deleted_at)",
        "CREATE INDEX IF NOT EXISTS idx_notes_is_favorite ON notes(is_favorite)",
        "CREATE INDEX IF NOT EXISTS idx_notes_is_pinned ON notes(is_pinned)",
        
        // Links 인덱스
        "CREATE INDEX IF NOT EXISTS idx_links_source ON links(source_note_id)",
        "CREATE INDEX IF NOT EXISTS idx_links_target ON links(target_note_id)",
        "CREATE INDEX IF NOT EXISTS idx_links_type ON links(link_type)",
        
        // Tags 인덱스
        "CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name)",
        "CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON tags(usage_count)",
        
        // Note Tags 인덱스
        "CREATE INDEX IF NOT EXISTS idx_note_tags_note ON note_tags(note_id)",
        "CREATE INDEX IF NOT EXISTS idx_note_tags_tag ON note_tags(tag_id)",
        
        // Recent Activities 인덱스
        "CREATE INDEX IF NOT EXISTS idx_recent_activities_type ON recent_activities(activity_type)",
        "CREATE INDEX IF NOT EXISTS idx_recent_activities_created_at ON recent_activities(created_at)",
        "CREATE INDEX IF NOT EXISTS idx_recent_activities_note_id ON recent_activities(note_id)",
        "CREATE INDEX IF NOT EXISTS idx_recent_activities_folder_id ON recent_activities(folder_id)",
        
        // 복합 인덱스 (자주 함께 사용되는 컬럼들)
        "CREATE INDEX IF NOT EXISTS idx_notes_folder_updated ON notes(folder_id, updated_at) WHERE deleted_at IS NULL",
        "CREATE INDEX IF NOT EXISTS idx_notes_favorite_updated ON notes(is_favorite, updated_at) WHERE deleted_at IS NULL",
    ];
    
    for index in indexes {
        match connection.execute(index, []) {
            Ok(_) => {},
            Err(e) => {
                eprintln!("인덱스 생성 실패: {}", e);
                eprintln!("SQL: {}", index);
                return Err(e);
            }
        }
    }
    
    println!("🔍 인덱스 생성 완료");

    Ok(())
}

fn create_triggers(connection: &Connection) -> Result<()> {
    println!("⚡ 트리거 생성 중...");
    
    // Notes 업데이트 시 updated_at 자동 갱신
    connection.execute(
        "CREATE TRIGGER IF NOT EXISTS update_notes_timestamp 
         AFTER UPDATE ON notes
         FOR EACH ROW
         WHEN NEW.updated_at = OLD.updated_at
         BEGIN
             UPDATE notes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
         END",
        [],
    )?;
    
    // Folders 업데이트 시 updated_at 자동 갱신
    connection.execute(
        "CREATE TRIGGER IF NOT EXISTS update_folders_timestamp 
         AFTER UPDATE ON folders
         FOR EACH ROW
         WHEN NEW.updated_at = OLD.updated_at
         BEGIN
             UPDATE folders SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
         END",
        [],
    )?;
    
    // 노트 생성 시 recent_activities 자동 기록
    connection.execute(
        "CREATE TRIGGER IF NOT EXISTS log_note_activity_insert
         AFTER INSERT ON notes
         FOR EACH ROW
         BEGIN
             INSERT INTO recent_activities (activity_type, note_id, metadata)
             VALUES ('created', NEW.id, json_object('title', NEW.title));
         END",
        [],
    )?;
    
    // 노트 수정 시 recent_activities 자동 기록
    connection.execute(
        "CREATE TRIGGER IF NOT EXISTS log_note_activity_update
         AFTER UPDATE ON notes
         FOR EACH ROW
         WHEN NEW.body != OLD.body OR NEW.title != OLD.title
         BEGIN
             INSERT INTO recent_activities (activity_type, note_id, metadata)
             VALUES ('updated', NEW.id, json_object('title', NEW.title));
         END",
        [],
    )?;
    
    // 태그 사용 빈도 자동 업데이트
    connection.execute(
        "CREATE TRIGGER IF NOT EXISTS update_tag_usage_count_insert
         AFTER INSERT ON note_tags
         FOR EACH ROW
         BEGIN
             UPDATE tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
         END",
        [],
    )?;
    
    connection.execute(
        "CREATE TRIGGER IF NOT EXISTS update_tag_usage_count_delete
         AFTER DELETE ON note_tags
         FOR EACH ROW
         BEGIN
             UPDATE tags SET usage_count = usage_count - 1 WHERE id = OLD.tag_id;
         END",
        [],
    )?;
    
    println!("⚡ 트리거 생성 완료");
    Ok(())
}