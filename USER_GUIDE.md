# マルチエージェントシステム 使用ガイド

このガイドでは、複数のClaude Codeエージェントを使った協調開発システムの基本的な使い方を説明します。

## 📋 目次

1. [システム概要](#システム概要)
2. [起動方法](#起動方法)
3. [基本コマンド](#基本コマンド)
4. [動作フロー](#動作フロー)
5. [実践例](#実践例)
6. [ToDoリスト管理](#todoリスト管理)
7. [ベストプラクティス](#ベストプラクティス)
8. [トラブルシューティング](#トラブルシューティング)

## システム概要

### エージェントの役割

| エージェント | 役割 | 主な責任 |
|-------------|------|----------|
| **Project Manager** | プロジェクト管理 | タスク分割、進捗管理、全体調整 |
| **Developer** | 開発実装 | コーディング、API実装、テスト作成 |
| **UI Designer** | UI/UX設計 | インターフェース設計、デザインシステム構築 |
| **Code Reviewer** | 品質管理 | コードレビュー、セキュリティチェック、最適化提案 |

### コミュニケーションフロー

```
あなた（人間）
    ↓ 要件・指示
Project Manager（PM）
    ↓ タスク分割・割り当て
Developer / Designer / Reviewer
    ↓ 実装・レビュー
各エージェントのClaude CLI
```

## 起動方法

### 方法1: Zellij を使った一括起動（推奨）

```bash
# Zellijがインストールされている場合
zellij action new-tab --layout ./my-squad.kdl
```

これにより4分割された画面で全エージェントが自動起動します。

### 方法2: 個別ターミナルでの起動

4つのターミナルウィンドウを開き、それぞれで実行：

```bash
# Terminal 1 - プロジェクトマネージャー
node agent.js "Project Manager"

# Terminal 2 - 開発者
node agent.js "Developer"

# Terminal 3 - UIデザイナー
node agent.js "UI Designer"

# Terminal 4 - コードレビュアー
node agent.js "Code Reviewer"
```

## 基本コマンド

各エージェントのインタラクティブモードで使用可能なコマンド：

| コマンド | 説明 | 使用例 |
|---------|------|--------|
| `help` | 使用可能なコマンド一覧を表示 | `help` |
| `send <agent> <message>` | 他のエージェントにメッセージを送信 | `send developer ログイン機能を実装してください` |
| `check` | 新着メッセージを確認 | `check` |
| `todo` | 共有ToDoリストを表示 | `todo` |
| `claude` | Claude CLIを起動（実際の実装作業用） | `claude` |
| `exit` | エージェントを終了 | `exit` |

### エージェント名の指定

sendコマンドで使用するエージェント名：
- `pm` または `manager` - Project Manager
- `developer` または `dev` - Developer
- `designer` または `ui` - UI Designer
- `reviewer` または `review` - Code Reviewer

## 動作フロー

### 1. タスクの開始

人間がPMに要件を伝える：
```
# PMのターミナルで
ユーザー認証機能を実装してください。
ログイン、ログアウト、パスワードリセット機能を含めてください。
```

### 2. タスクの分割と割り当て

PMが各エージェントにタスクを割り当て：
```
send designer ログイン画面のUIを設計してください
send developer 認証APIを実装してください
send developer パスワードリセット機能を実装してください
```

### 3. 実装作業

各エージェントで`claude`コマンドを実行し、実際のコーディング：
```
claude
# Claude CLIが起動し、実装を開始
```

### 4. レビューとフィードバック

```
# Developer → Reviewer
send reviewer 認証機能のコードレビューをお願いします

# Reviewer → Developer
send developer パスワードの複雑性チェックを追加してください
```

### 5. 完了報告

```
# Developer → PM
send pm 認証機能の実装が完了しました
```

## 実践例

### 例1: 簡単な機能追加

```bash
# Step 1: PMに依頼
"ダークモード切り替え機能を追加してください"

# Step 2: PMがタスクを分割
send designer ダークモード用のカラーパレットを定義してください
send developer テーマ切り替えロジックを実装してください

# Step 3: 各エージェントが作業
# Designer: カラースキーム設計
# Developer: 切り替え機能実装

# Step 4: 完了確認
todo  # ToDoリストで進捗確認
```

### 例2: バグ修正フロー

```bash
# バグ報告
send pm ログイン後にセッションが維持されないバグがあります

# PMが調査依頼
send developer ログイン後のセッション管理を確認してください

# 修正とレビュー
send reviewer セッション管理の修正をレビューしてください
```

## ToDoリスト管理

`shared/todos.md`ファイルで全体のタスクを管理：

```markdown
## 🔴 High Priority Tasks

### 認証機能
- [x] ログインUI設計 (Designer) ✅ 2024-01-18
- [x] ログインAPI実装 (Developer) ✅ 2024-01-18
- [ ] パスワードリセット (Developer) 🚧 作業中
- [ ] セキュリティレビュー (Reviewer)

## 🟡 Medium Priority Tasks

### ダークモード
- [ ] カラーパレット定義 (Designer)
- [ ] 切り替え機能実装 (Developer)
```

### ToDoの更新タイミング

- タスク開始時：`🚧 作業中`を追加
- タスク完了時：`[x]`にチェックを入れ、`✅`と日付を追加
- ブロッカーがある場合：`⚠️ ブロック中：[理由]`を追加

## ベストプラクティス

### 1. 明確な指示

❌ 悪い例：
```
ログイン機能を作って
```

✅ 良い例：
```
ユーザー認証機能を実装してください。
要件：
- メールアドレスとパスワードでのログイン
- セッション維持（24時間）
- パスワードリセット機能
- 2要素認証（オプション）
```

### 2. 適切な役割分担

- **Designer**: UI/UX、ビジュアルデザイン、インタラクション
- **Developer**: ロジック実装、API、データベース連携
- **Reviewer**: 品質チェック、セキュリティ、パフォーマンス

### 3. 定期的な進捗確認

```bash
# PMが定期的に実行
send developer 進捗はいかがですか？
send designer UIの実装状況を教えてください
todo  # 全体の進捗確認
```

### 4. エラー処理の明確化

問題が発生した場合は、具体的に報告：
```
send pm データベース接続でエラーが発生しています。
エラー内容：[具体的なエラーメッセージ]
試したこと：[対処法]
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. メッセージが届かない

**確認事項：**
- `shared/messages/`ディレクトリが存在するか
- ファイルの読み書き権限があるか
- エージェント名を正しく指定しているか

**解決方法：**
```bash
# メッセージディレクトリの確認
ls -la shared/messages/

# 権限の修正
chmod 755 shared/messages
```

#### 2. Claude CLIが起動しない

**確認事項：**
- Claude CLIがインストールされているか
- PATHが通っているか

**解決方法：**
```bash
# Claude CLIの確認
which claude

# インストールされていない場合
# https://claude.ai/cli からインストール
```

#### 3. エージェントが応答しない

**解決方法：**
1. `exit`コマンドでエージェントを終了
2. ターミナルを再起動
3. エージェントを再度起動

#### 4. ToDoリストが更新されない

**確認事項：**
- `shared/todos.md`の編集権限
- ファイルが他のプロセスでロックされていないか

### デバッグモード

詳細なログを表示したい場合：
```bash
# 環境変数を設定して起動
DEBUG=true node agent.js "Developer"
```

## 次のステップ

1. **小規模タスクから開始**: 簡単な機能追加から始める
2. **徐々に複雑化**: 慣れてきたら大規模な機能開発へ
3. **カスタマイズ**: `instructions/`の指示書を project に合わせて調整
4. **自動化**: よく使うタスクはスクリプト化

## サポート

問題が解決しない場合は：
1. `test-integration.sh`を実行して環境を確認
2. `TEST_RESULTS.md`でシステムの状態を確認
3. GitHubのIssuesで質問

---

Happy coding with your AI team! 🚀