

export interface User {
    username: string
    email?: string,
    password: string
}

export interface RequestParameter {
    method: string,
    headers: HeadersInit,
    body?: string
}

export interface SideBarProps {
    getAllOpenTab: () => Promise<void>,
    openNewNoteEditor?: () => void
}

export interface Tab {
    note_id: number,
    note_title: string,
    currentTab: number
}

export interface EditorProps {
    content: string,
    handleChange: (value: string) => void
}

export interface Note {
    note_id: number,
    note_title: string
}

export interface InputBoxProps {
    createNotes: (title: string) => Promise<void>
}

export interface ButtonProps {
    openInputBox: () => void
}