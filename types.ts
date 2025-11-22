
export type PageType = 'read' | 'challenge';

export type IllustrationType = 
  | 'reactivity-eye' 
  | 'dep-bell' 
  | 'vdom-tree' 
  | 'patch-diff' 
  | 'mount-plant' 
  | 'proxy-shield'
  | 'vapor-steam';

export interface PageData {
  id: string; // e.g. '1-1'
  type: PageType;
  title: string;
  content?: string; // For 'read' pages (HTML/Markdown-like)
  codeSnippet?: string; // For 'read' pages
  illustration?: IllustrationType; // For 'read' pages
  
  // For 'challenge' pages
  challenge?: {
    subtitle: string;
    description: string;
    codeContext: string; // The full logic
    codePre: string;
    codePost: string;
    placeholder: string;
    correctAnswer: string[];
    hints: string[]; // Changed from hint: string to hints: string[]
    visualType: 'reactivity' | 'vdom' | 'render' | 'patch';
  }
}

export interface ChapterData {
  id: number;
  title: string;
  color: string; // Tailwind color class
  pages: PageData[];
}

export interface ChapterState {
  completedPageIds: string[];
  userCode: Record<string, string>; // pageId -> code
}
