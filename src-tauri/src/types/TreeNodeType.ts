// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export type TreeNodeType = { "type": "folder", id: bigint, name: string, parent_id: bigint | null, children_count: bigint, updated_at: string, } | { "type": "note", id: bigint, title: string, folder_id: bigint | null, parent_note_id: bigint | null, is_pinned: boolean, is_favorite: boolean, word_count: bigint, updated_at: string, };
