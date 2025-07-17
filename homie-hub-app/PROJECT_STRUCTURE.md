# HomieHub Next.js プロジェクト構造

## ディレクトリ構成

```
homie-hub-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト（ヘッダー、フッター含む）
│   ├── page.tsx           # ホームページ
│   ├── globals.css        # グローバルスタイル
│   ├── dashboard/         # ダッシュボード
│   ├── schedule/          # スケジュール管理
│   ├── todos/             # ToDo管理
│   ├── messages/          # メッセージング
│   ├── documents/         # ドキュメント管理
│   ├── health/            # ヘルスケア
│   └── settings/          # 設定画面
├── components/            # 再利用可能なコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── features/         # 機能別コンポーネント
│   └── layouts/          # レイアウトコンポーネント
├── lib/                   # ユーティリティ関数
│   ├── api/              # API関連
│   ├── hooks/            # カスタムフック
│   └── utils/            # その他ユーティリティ
├── public/               # 静的ファイル
├── types/                # TypeScript型定義
└── config/               # 設定ファイル

## 開発ガイドライン

### コンポーネント開発
- コンポーネントは機能単位で分割
- Props の型定義を必ず行う
- Storybook でのドキュメント化（後日追加予定）

### スタイリング
- Tailwind CSS を使用
- カスタムコンポーネントは components/ui に配置
- レスポンシブデザインを考慮

### 状態管理
- 小規模な状態は useState/useReducer
- グローバルな状態は Context API
- 必要に応じて Zustand を導入

### API設計
- App Router の Route Handlers を使用
- RESTful な設計を心がける
- エラーハンドリングを適切に実装

## エージェント別タスク分担

### Project Manager
- 要件定義とタスク管理
- 進捗確認とスケジュール調整

### Developer
- 機能実装とテスト作成
- API設計と実装

### UI Designer
- UIコンポーネントの設計
- デザインシステムの構築

### Code Reviewer
- コードレビューと品質管理
- セキュリティとパフォーマンスの確認