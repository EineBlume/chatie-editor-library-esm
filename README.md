# Chatie Editor Library

[![codecov](https://codecov.io/gh/EineBlume/chatie-viewer/branch/master/graph/badge.svg?token=4JKjJBN4mT)](https://codecov.io/gh/EineBlume/chatie-viewer)

Chatie 플랫폼을 위한 React 기반 채팅 스토리 에디터 라이브러리

## 📋 필수 조건

### Node.js 및 패키지 매니저

- **Node.js**: v16.0.0 이상
- **npm**: v7.0.0 이상 또는 **yarn**: v1.22.0 이상

### 프로젝트 요구사항

- **React**: 16.8.0 이상 (Hooks 지원 필수)
- **ES Modules 지원**: 프로젝트가 ESM을 지원해야 함

### 필수 Peer Dependencies

이 라이브러리를 사용하려면 다음 패키지들이 **반드시** 설치되어 있어야 합니다:

| 패키지          | 버전      | 용도            |
| --------------- | --------- | --------------- |
| `react`         | ≥16.8.0   | UI 렌더링       |
| `react-dom`     | ≥16.8.0   | DOM 렌더링      |
| `axios`         | ^0.21.1   | HTTP 통신       |
| `i18next`       | 모든 버전 | 다국어 지원     |
| `react-i18next` | ^11.18.6  | React i18n 통합 |

## 📦 설치

### 1. Peer Dependencies 설치

먼저 필수 의존성을 설치합니다:

```bash
# npm 사용
npm install react react-dom axios i18next react-i18next

# yarn 사용
yarn add react react-dom axios i18next react-i18next
```

### 2. 라이브러리 설치

```bash
# GitHub에서 직접 설치 (최신 버전)
npm install git+https://github.com/[OWNER]/chatie-editor-library-esm.git#v0.0.3-test.4

# 또는 yarn으로
yarn add git+https://github.com/[OWNER]/chatie-editor-library-esm.git#v0.0.3-test.4
```

### 3. 설치 확인

`package.json`에 다음과 같이 추가되어 있는지 확인:

```json
{
  "dependencies": {
    "@chatie/editor-library": "git+https://github.com/[OWNER]/chatie-editor-library-esm.git#v0.0.3-test.4",
    "react": "^16.8.0",
    "react-dom": "^16.8.0",
    "axios": "^0.21.1",
    "i18next": "^23.0.0",
    "react-i18next": "^11.18.6"
  }
}
```

## 🚀 사용 방법

### 기본 설정

```jsx
import React from 'react';
import { Editor, EditorManager } from '@chatie/editor-library';
import '@chatie/editor-library/style.css'; // ⚠️ CSS를 반드시 import 해야 합니다!

function App() {
  const manager = new EditorManager(EditorManager.makeInitialDraft(), {
    cursorIndex: 0,
  });

  const handleMediaUpload = async (type, file) => {
    // 미디어 업로드 로직 구현
    return { url: 'uploaded-url', id: 'media-id' };
  };

  return (
    <Editor
      manager={manager}
      onMediaUpload={handleMediaUpload}
      locale="ko"
      storyId={1}
      episodeId={1}
      isCharacterFetched={true}
    />
  );
}
```

### 필수 Props

| Prop                 | 타입          | 필수 | 설명                      |
| -------------------- | ------------- | ---- | ------------------------- |
| `manager`            | EditorManager | ✅   | 에디터 상태 관리자        |
| `onMediaUpload`      | Function      | ✅   | 미디어 업로드 핸들러      |
| `locale`             | string        | ✅   | 언어 설정 ('ko', 'en' 등) |
| `storyId`            | number        | ✅   | 스토리 ID                 |
| `episodeId`          | number        | ✅   | 에피소드 ID               |
| `isCharacterFetched` | boolean       | ✅   | 캐릭터 데이터 로딩 여부   |

## ⚙️ 환경 설정

### 1. i18next 설정 (필수)

```jsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: {
        /* 한국어 번역 */
      },
    },
    en: {
      translation: {
        /* 영어 번역 */
      },
    },
  },
  lng: 'ko',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
```

### 2. Bundler 설정

#### Webpack 5

```js
// webpack.config.js
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
```

#### Vite

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@chatie/editor-library'],
  },
};
```

### 3. TypeScript 설정 (선택)

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "jsx": "react"
  }
}
```

## 📊 빌드 정보

- **형식**: ES Module (ESM)
- **번들 크기**: 879 KiB (CSS 포함)
- **CSS**: JavaScript에 자동 번들 (별도 import 불필요)
- **TypeScript**: 타입 정의 포함 (`index.d.ts`)

## 🔧 API 레퍼런스

### EditorManager

```typescript
class EditorManager {
  constructor(draft: Draft, options?: { cursorIndex?: number });

  static makeInitialDraft(): Draft;

  Draft: {
    content: Content;
    characters: Character[];
    export(): { scenes: Scene[]; characters: Character[] };
  };
}
```

### Editor Props

```typescript
interface EditorProps {
  // 필수
  manager: EditorManager;
  onMediaUpload: (
    type: 'image' | 'profileImage' | 'backgroundImage',
    file: File
  ) => Promise<MediaResult>;
  locale: string;
  storyId: number;
  episodeId: number;
  isCharacterFetched: boolean;

  // 선택
  onCreateCharacter?: () => void;
  onEditCharacter?: () => void;
  onRemoveCharacter?: () => void;
  onAddItem?: () => void;
  onEditItem?: () => void;
  onDeleteItem?: () => void;
  onModalShow?: (modalType: string) => void;
  onModalHide?: (modalType: string) => void;
  onPreview?: (sceneIndex: number, chatIndex: number) => void;
  fetcher?: (url: string, config?: any) => Promise<any>;
  logger?: (key: string, data: any) => void;
  fetchSdUrl?: string;
  adult?: boolean;
}
```

## 🎨 스타일 커스터마이징

모든 스타일은 `cv-` 접두사로 시작하는 CSS 클래스를 사용합니다:

```css
/* 커스텀 스타일 */
.cv-editor {
  background-color: #f5f5f5;
}

.cv-scene {
  padding: 20px;
}

.cv-chat-item {
  border-radius: 8px;
}
```

## 🔄 업데이트

### 최신 버전으로 업데이트

```bash
npm update @chatie/editor-library

# 또는 특정 버전 설치
npm install git+https://github.com/[OWNER]/chatie-editor-library-esm.git#v0.0.3-test.5
```

## ⚠️ 주의사항

1. **CSS Import 불필요**: 스타일이 JavaScript에 자동으로 포함되어 있습니다
2. **React 버전**: 16.8.0 이상 필요 (Hooks 지원)
3. **ESM 전용**: CommonJS 환경에서는 동작하지 않습니다
4. **Peer Dependencies**: 반드시 수동으로 설치해야 합니다

## 🐛 트러블슈팅

### 문제: Module not found 에러

```bash
# 모든 peer dependencies가 설치되었는지 확인
npm ls react react-dom axios i18next react-i18next
```

### 문제: CSS가 적용되지 않음

- CSS는 자동으로 포함됩니다. 별도 import하지 마세요.
- 번들러가 style-loader를 지원하는지 확인하세요.

### 문제: TypeScript 타입 에러

```bash
# 타입 정의가 제대로 설치되었는지 확인
npm ls @chatie/editor-library
```

## 📌 버전 정보

### v0.0.3-test.4 (현재)

- ✅ CSS 자동 번들링 (별도 import 불필요)
- ✅ CSS Modules (`cv-` 접두사)
- ✅ 안전한 압축 설정
- ✅ TypeScript 타입 정의
- ✅ 번들 크기: 879 KiB

---

**Chatie Platform** | Private License
