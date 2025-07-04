use rusqlite::{Connection, Result};
use std::collections::HashMap;

use crate::model::tree::{FolderItem, NoteItem, TreeNode, TreeNodeType};

// =============================================
// 공개 API 함수들
// =============================================

pub fn get_file_tree(connection: &Connection) -> Result<Vec<TreeNode>> {
    let folders = get_all_folders(connection)?;
    let notes = get_all_notes_for_tree(connection)?;

    let tree = build_tree_structure(folders, notes);
    Ok(tree)
}

// =============================================
// 데이터베이스 조회 함수들
// =============================================

fn get_all_folders(connection: &Connection) -> Result<Vec<FolderItem>> {
    let mut stmt = connection.prepare(
        "SELECT f.id, f.name, f.parent_id, f.updated_at,
                (SELECT COUNT(*) FROM folders cf WHERE cf.parent_id = f.id AND cf.deleted_at IS NULL) +
                (SELECT COUNT(*) FROM notes cn WHERE cn.folder_id = f.id AND cn.deleted_at IS NULL) as children_count
         FROM folders f
         WHERE f.deleted_at IS NULL 
         ORDER BY f.name ASC"
    )?;

    let folder_iter = stmt.query_map([], |row| {
        Ok(FolderItem {
            id: row.get(0)?,
            name: row.get(1)?,
            parent_id: row.get(2)?,
            updated_at: row.get(3)?,
            children_count: row.get(4)?,
        })
    })?;

    folder_iter.collect()
}

fn get_all_notes_for_tree(connection: &Connection) -> Result<Vec<NoteItem>> {
    let mut stmt = connection.prepare(
        "SELECT id, title, folder_id, parent_note_id, is_pinned, is_favorite, word_count, updated_at 
         FROM notes
         WHERE deleted_at IS NULL 
         ORDER BY is_pinned DESC, title ASC"
    )?;

    let note_iter = stmt.query_map([], |row| {
        Ok(NoteItem {
            id: row.get(0)?,
            title: row.get(1)?,
            folder_id: row.get(2)?,
            parent_note_id: row.get(3)?,
            is_pinned: row.get(4)?,
            is_favorite: row.get(5)?,
            word_count: row.get(6)?,
            updated_at: row.get(7)?,
        })
    })?;

    note_iter.collect()
}

// =============================================
// 트리 구조 빌드 함수들
// =============================================

fn build_tree_structure(folders: Vec<FolderItem>, notes: Vec<NoteItem>) -> Vec<TreeNode> {
    let folders_by_parent = group_folders_by_parent(folders);
    let notes_by_folder = group_notes_by_folder(notes);

    build_children(None, &folders_by_parent, &notes_by_folder)
}

fn group_folders_by_parent(folders: Vec<FolderItem>) -> HashMap<Option<i64>, Vec<FolderItem>> {
    let mut folders_by_parent = HashMap::new();
    for folder in folders {
        folders_by_parent
            .entry(folder.parent_id)
            .or_insert_with(Vec::new)
            .push(folder);
    }
    folders_by_parent
}

fn group_notes_by_folder(notes: Vec<NoteItem>) -> HashMap<Option<i64>, Vec<NoteItem>> {
    let mut notes_by_folder = HashMap::new();
    for note in notes {
        notes_by_folder
            .entry(note.folder_id)
            .or_insert_with(Vec::new)
            .push(note);
    }
    notes_by_folder
}

fn build_children(
    parent_id: Option<i64>,
    folders_by_parent: &HashMap<Option<i64>, Vec<FolderItem>>,
    notes_by_folder: &HashMap<Option<i64>, Vec<NoteItem>>,
) -> Vec<TreeNode> {
    let mut children = Vec::new();

    // 폴더 추가
    if let Some(current_folders) = folders_by_parent.get(&parent_id) {
        for folder in current_folders {
            let folder_node = create_folder_node(folder, folders_by_parent, notes_by_folder);
            children.push(folder_node);
        }
    }

    // 노트 추가
    if let Some(current_notes) = notes_by_folder.get(&parent_id) {
        for note in current_notes {
            let note_node = create_note_node(note);
            children.push(note_node);
        }
    }

    sort_children(&mut children);
    children
}

fn create_folder_node(
    folder: &FolderItem,
    folders_by_parent: &HashMap<Option<i64>, Vec<FolderItem>>,
    notes_by_folder: &HashMap<Option<i64>, Vec<NoteItem>>,
) -> TreeNode {
    let children = build_children(Some(folder.id), folders_by_parent, notes_by_folder);

    TreeNode {
        node: TreeNodeType::Folder {
            id: folder.id,
            name: folder.name.clone(),
            parent_id: folder.parent_id,
            children_count: folder.children_count,
            updated_at: folder.updated_at.clone(),
        },
        children,
    }
}

fn create_note_node(note: &NoteItem) -> TreeNode {
    TreeNode {
        node: TreeNodeType::Note {
            id: note.id,
            title: note.title.clone(),
            folder_id: note.folder_id,
            parent_note_id: note.parent_note_id,
            is_pinned: note.is_pinned,
            is_favorite: note.is_favorite,
            word_count: note.word_count,
            updated_at: note.updated_at.clone(),
        },
        children: Vec::new(),
    }
}

fn sort_children(children: &mut Vec<TreeNode>) {
    children.sort_by(|a, b| match (&a.node, &b.node) {
        // 폴더끼리 비교 - 이름순
        (TreeNodeType::Folder { name: a_name, .. }, TreeNodeType::Folder { name: b_name, .. }) => {
            a_name.cmp(b_name)
        }
        // 폴더가 노트보다 먼저
        (TreeNodeType::Folder { .. }, TreeNodeType::Note { .. }) => std::cmp::Ordering::Less,
        (TreeNodeType::Note { .. }, TreeNodeType::Folder { .. }) => std::cmp::Ordering::Greater,
        // 노트끼리 비교 - 핀 여부 > 제목순
        (
            TreeNodeType::Note {
                is_pinned: a_pinned,
                title: a_title,
                ..
            },
            TreeNodeType::Note {
                is_pinned: b_pinned,
                title: b_title,
                ..
            },
        ) => match b_pinned.cmp(a_pinned) {
            std::cmp::Ordering::Equal => a_title.cmp(b_title),
            other => other,
        },
    });
}
