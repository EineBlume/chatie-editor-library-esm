import React from 'react';

// Main Editor Component
export interface EditorProps {
  /** EditorManager instance */
  manager: EditorManager;
  /** Callback when adding a new item */
  onAddItem: (item: ChatItem) => void;
  /** Callback when editing an item */
  onEditItem: (itemId: string, item: ChatItem) => void;
  /** Callback when deleting an item */
  onDeleteItem: (itemId: string) => void;
  /** Callback for media upload */
  onMediaUpload: (file: File, type: string) => Promise<MediaUploadResult>;
  /** Callback when creating a character */
  onCreateCharacter: (character: Character) => void;
  /** Callback when editing a character */
  onEditCharacter: (characterId: string, character: Character) => void;
  /** Callback when removing a character */
  onRemoveCharacter: (characterId: string) => void;
  /** Optional callback when modal shows */
  onModalShow?: () => void;
  /** Optional callback when modal hides */
  onModalHide?: () => void;
  /** Optional callback when writer more menu shows */
  onWriterMoreShow?: () => void;
  /** Optional callback when writer more menu hides */
  onWriterMoreHide?: () => void;
  /** Optional callback when side menu shows */
  onSideMenuShow?: () => void;
  /** Optional callback when side menu hides */
  onSideMenuHide?: () => void;
  /** Optional preview handler */
  onPreview?: () => void;
  /** Optional data fetcher */
  fetcher?: (url: string, options?: any) => Promise<any>;
  /** Optional logger */
  logger?: (level: string, message: string, data?: any) => void;
  /** Story ID */
  storyId?: number;
  /** Episode ID */
  episodeId?: number;
  /** Whether characters are fetched */
  isCharacterFetched?: boolean;
  /** Adult content flag */
  adult?: boolean;
  /** Locale setting */
  locale?: string;
  /** SD image fetch URL */
  fetchSdUrl?: string;
  /** Help handler */
  onClickHelp?: () => void;
  /** V2 story flag */
  isV2Story?: boolean;
  /** Main characters array */
  mainCharacters?: Character[];
  /** Add main character handler */
  onAddMainCharacter?: (character: Character) => void;
  /** Remove main character handler */
  onRemoveMainCharacter?: (characterId: string) => void;
  /** Edit main character handler */
  onEditMainCharacter?: (characterId: string, character: Character) => void;
  /** Change main character handler */
  onChangeMainCharacter?: (characterId: string) => void;
  /** Check edit or remove main character handler */
  onCheckEditOrRemoveMainCharacter?: (characterId: string) => boolean;
}

// Editor Manager Class
export class EditorManager {
  constructor(scenes?: Scene[]);

  /** Viewer instance */
  Viewer: ViewerState;

  /** Add a new scene */
  addScene(scene: Scene): void;

  /** Remove a scene */
  removeScene(sceneId: string): void;

  /** Update a scene */
  updateScene(sceneId: string, scene: Partial<Scene>): void;

  /** Get all scenes */
  getScenes(): Scene[];

  /** Set current scene */
  setCurrentScene(sceneIndex: number): void;

  /** Get current scene */
  getCurrentScene(): Scene;

  /** Add item to current scene */
  addItemToScene(item: ChatItem): void;

  /** Update item in scene */
  updateItemInScene(itemId: string, item: Partial<ChatItem>): void;

  /** Remove item from scene */
  removeItemFromScene(itemId: string): void;
}

// Viewer State Class
export class ViewerState {
  /** Get current state */
  getState(): any;

  /** Get characters in current scene */
  getCharactersInCurrentScene(): Character[];

  /** All scenes */
  entireScenes: Scene[];

  /** Current scene index */
  currentSceneIndex: number;

  /** Update state */
  setState(state: any): void;

  /** Reset state */
  resetState(): void;
}

// Validation function
export function validate(scenes: Scene[]): ValidationResult;

// Clean function
export function clean(data: any): any;

// Type Definitions
export interface ChatItem {
  id: string;
  type: ChatItemType;
  position?: 'left' | 'right';
  object?: any;
  characterId?: string;
  timestamp?: number;
}

export interface Character {
  id: string;
  name: string;
  avatar?: string;
  color?: string;
  description?: string;
  isMain?: boolean;
}

export interface Scene {
  id: string;
  name: string;
  items: ChatItem[];
  background?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

export interface MediaUploadResult {
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  size?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export type ChatItemType =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'narration'
  | 'effect'
  | 'phone'
  | 'sound_effect'
  | 'fullscreen';

// Default export
declare const Editor: React.FC<EditorProps>;
export default Editor;
