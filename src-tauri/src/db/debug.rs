use rusqlite::Connection;
use rusqlite::Result;

/// 데이터베이스 상태 확인 (디버그용)
pub fn check_database_status(connection: &Connection) -> Result<()> {
    println!("\n📊 === 데이터베이스 상태 확인 ===");

    // 테이블 목록 확인
    let mut stmt = connection.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    )?;

    let table_iter = stmt.query_map([], |row| Ok(row.get::<_, String>(0)?))?;

    println!("📋 생성된 테이블:");
    for table in table_iter {
        println!("  - {}", table?);
    }

    // 각 테이블의 레코드 수 확인
    let tables = vec![
        "projects",
        "notes",
        "note_links",
        "tags",
        "note_tags",
        "recent_activities",
        "user_settings",
    ];

    println!("\n📈 테이블별 레코드 수:");
    for table in tables {
        let count: i64 =
            connection.query_row(&format!("SELECT COUNT(*) FROM {}", table), [], |row| {
                row.get(0)
            })?;
        println!("  - {}: {} 개", table, count);
    }

    println!("================================\n");

    Ok(())
}
