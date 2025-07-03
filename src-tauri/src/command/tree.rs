// src-tauri/src/command/tree.rs
use rusqlite::Connection;
use tauri::{async_runtime::Mutex, State};

use crate::{
    model::tree::{FlatTreeNode, TreeNode},
    service::tree::{get_file_tree, get_flat_file_tree},
};

// 계층형 파일 트리 조회 (중첩 구조)
#[tauri::command]
pub async fn get_sidebar_tree_command(
    connection: State<'_, Mutex<Connection>>,
) -> Result<Vec<TreeNode>, String> {
    let conn = connection.lock().await;

    match get_file_tree(&*conn) {
        Ok(tree) => {
            println!("✅ 사이드바 트리 조회 성공: {} 개 루트 노드", tree.len());
            Ok(tree)
        }
        Err(e) => {
            eprintln!("❌ 사이드바 트리 조회 실패: {}", e);
            Err(format!("사이드바 트리를 조회할 수 없습니다: {}", e))
        }
    }
}

// 플랫 파일 트리 조회 (가상화용)
#[tauri::command]
pub async fn get_sidebar_flat_tree_command(
    connection: State<'_, Mutex<Connection>>,
) -> Result<Vec<FlatTreeNode>, String> {
    let conn = connection.lock().await;

    match get_flat_file_tree(&*conn) {
        Ok(flat_tree) => {
            println!(
                "✅ 플랫 사이드바 트리 조회 성공: {} 개 노드",
                flat_tree.len()
            );
            Ok(flat_tree)
        }
        Err(e) => {
            eprintln!("❌ 플랫 사이드바 트리 조회 실패: {}", e);
            Err(format!("플랫 사이드바 트리를 조회할 수 없습니다: {}", e))
        }
    }
}

// 특정 폴더의 직계 자식만 조회 (지연 로딩용)
#[tauri::command]
pub async fn get_folder_children_command(
    connection: State<'_, Mutex<Connection>>,
    folder_id: Option<i64>,
) -> Result<Vec<TreeNode>, String> {
    let conn = connection.lock().await;

    match get_folder_children_internal(&*conn, folder_id) {
        Ok(children) => {
            println!("✅ 폴더 자식 조회 성공: {} 개", children.len());
            Ok(children)
        }
        Err(e) => {
            eprintln!("❌ 폴더 자식 조회 실패: {}", e);
            Err(format!("폴더 자식을 조회할 수 없습니다: {}", e))
        }
    }
}

// 내부 구현: 특정 폴더의 직계 자식만 조회
fn get_folder_children_internal(
    connection: &Connection,
    parent_folder_id: Option<i64>,
) -> Result<Vec<TreeNode>, rusqlite::Error> {
    let mut children = Vec::new();

    // 자식 폴더 조회
    let mut folder_stmt = connection.prepare(
        "SELECT id, name, parent_id, updated_at,
                (SELECT COUNT(*) FROM folders cf WHERE cf.parent_id = f.id AND cf.deleted_at IS NULL) +
                (SELECT COUNT(*) FROM notes cn WHERE cn.folder_id = f.id AND cn.deleted_at IS NULL) as children_count
         FROM folders f
         WHERE f.parent_id IS ? AND f.deleted_at IS NULL 
         ORDER BY f.name ASC"
    )?;

    let folder_iter = folder_stmt.query_map([parent_folder_id], |row| {
        Ok(TreeNode {
            node: crate::model::tree::TreeNodeType::Folder {
                id: row.get(0)?,
                name: row.get(1)?,
                parent_id: row.get(2)?,
                children_count: row.get(4)?,
                updated_at: row.get(3)?,
            },
            children: Vec::new(),
        })
    })?;

    for folder in folder_iter {
        children.push(folder?);
    }

    // 폴더 내 노트 조회
    let mut note_stmt = connection.prepare(
        "SELECT id, title, folder_id, parent_note_id, is_pinned, is_favorite, word_count, updated_at 
         FROM notes
         WHERE folder_id IS ? AND parent_note_id IS NULL AND deleted_at IS NULL 
         ORDER BY is_pinned DESC, title ASC"
    )?;

    let note_iter = note_stmt.query_map([parent_folder_id], |row| {
        Ok(TreeNode {
            node: crate::model::tree::TreeNodeType::Note {
                id: row.get(0)?,
                title: row.get(1)?,
                folder_id: row.get(2)?,
                parent_note_id: row.get(3)?,
                is_pinned: row.get(4)?,
                is_favorite: row.get(5)?,
                word_count: row.get(6)?,
                updated_at: row.get(7)?,
            },
            children: Vec::new(),
        })
    })?;

    for note in note_iter {
        children.push(note?);
    }

    // 정렬: 폴더 먼저, 그 다음 노트 (핀 여부 고려)
    children.sort_by(|a, b| match (&a.node, &b.node) {
        (
            crate::model::tree::TreeNodeType::Folder { .. },
            crate::model::tree::TreeNodeType::Note { .. },
        ) => std::cmp::Ordering::Less,
        (
            crate::model::tree::TreeNodeType::Note { .. },
            crate::model::tree::TreeNodeType::Folder { .. },
        ) => std::cmp::Ordering::Greater,
        (
            crate::model::tree::TreeNodeType::Note {
                is_pinned: a_pinned,
                ..
            },
            crate::model::tree::TreeNodeType::Note {
                is_pinned: b_pinned,
                ..
            },
        ) => b_pinned.cmp(a_pinned),
        _ => std::cmp::Ordering::Equal,
    });

    Ok(children)
}
