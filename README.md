# HomieHub - Family Hub System

ファミリーハブシステム（HomieHub）は、家族の情報を一元管理し、コミュニケーションを円滑にするための統合プラットフォームです。このプロジェクトは、複数のAIエージェントが協調して開発を進める実験的なアプローチを採用しています。

## 🎯 プロジェクト概要

HomieHubは、以下の機能を提供する家族向け情報管理システムです：

- 📅 スケジュール管理（Googleカレンダー連携）
- ✅ ToDoカンバンボード
- 📝 ドキュメント管理（Notion風）
- 💬 家族間メッセージング
- 🎮 ゲーミフィケーション（ポイント・バッジ・家族の木）
- 🏥 ヘルスケア管理（成長記録・健康情報）

## 🤖 マルチエージェント開発環境

このプロジェクトでは、4つのAIエージェントが協調して開発を進めます：

1. **🤵 Project Manager** - プロジェクト全体の管理とタスク割り当て
2. **🧑‍💻 Developer** - コード実装とテスト作成
3. **🎨 UI Designer** - ユーザーインターフェース設計
4. **👀 Code Reviewer** - コード品質とセキュリティレビュー

## 📋 必要な環境

- Node.js 18.0.0以上
- npm または pnpm
- [Zellij](https://zellij.dev/) (ターミナルマルチプレクサー)
- Git

## 🚀 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/yugovic/HomieHub.git
cd HomieHub
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Zellijのインストール（未インストールの場合）

```bash
# macOS
brew install zellij

# Linux
curl -L https://github.com/zellij-org/zellij/releases/latest/download/zellij-x86_64-unknown-linux-musl.tar.gz | tar xz
```

## 💻 使用方法

### マルチエージェント環境の起動

```bash
zellij action new-tab --layout ./my-squad.kdl
```

これにより、4つのペインが開き、各エージェントが自動的に起動します。

### 個別エージェントの起動

```bash
# Project Manager
node agent.js "あなたは優秀なプロジェクトマネージャーです。"

# Developer
node agent.js "あなたは熟練の開発者です。"

# UI Designer
node agent.js "あなたは創造的なUIデザイナーです。"

# Code Reviewer
node agent.js "あなたは厳格なコードレビュアーです。"
```

### エージェント間コミュニケーション

各エージェントは以下のコマンドを使用できます：

- `send <agent> <message>` - 他のエージェントにメッセージを送信
- `check` - 新着メッセージを確認
- `todo` - 共有ToDoリストを表示
- `claude` - Claude CLIを起動
- `help` - 使用可能なコマンドを表示
- `exit` - エージェントを終了

## 📁 プロジェクト構造

```
HomieHub/
├── agent.js                 # エージェントシステムのコア
├── my-squad.kdl            # Zellij レイアウト設定
├── instructions/           # 各エージェントの指示書
│   ├── pm.md              # Project Manager用
│   ├── developer.md       # Developer用
│   ├── designer.md        # UI Designer用
│   └── reviewer.md        # Code Reviewer用
├── shared/                 # 共有リソース
│   ├── todos.md           # 共有ToDoリスト
│   └── messages/          # エージェント間メッセージ
├── requirements.md         # システム要件定義
└── settings.local.json    # ローカル設定（gitignore対象）
```

## 🛠 技術スタック（予定）

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Context API / Zustand
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## 🔒 セキュリティ設定

`settings.local.json`で、実行可能なコマンドを制限できます。デフォルトでは安全なコマンドのみが許可されています。

## 🤝 貢献方法

1. Issueを作成して機能提案やバグ報告
2. Forkしてプルリクエストを送信
3. コードレビューとフィードバック

## 📄 ライセンス

MIT License

## 📞 連絡先

Issues や Discussions でお気軽にご連絡ください。

---

**Note**: このプロジェクトは実験的なマルチエージェント開発手法を採用しています。AIエージェントによる自律的な開発プロセスの研究も兼ねています。