# Multi-Agent Development Template Setup Guide

このテンプレートを使用して、新しいプロジェクトでマルチエージェント開発環境を構築する手順です。

## 🚀 クイックスタート

### 1. テンプレートのコピー

```bash
# 新しいプロジェクトディレクトリを作成
mkdir my-new-project
cd my-new-project

# テンプレートをコピー
cp -r path/to/multi-agent-template/* .
```

### 2. プロジェクト固有の設定

#### 2.1 settings.local.jsonの作成
```bash
cp settings.local.json.template settings.local.json
```

編集項目:
- `project_settings.name`: プロジェクト名
- `project_settings.type`: プロジェクトタイプ（nextjs, react, nodejs等）
- `project_settings.database`: データベース（supabase, postgresql, mongodb等）
- `project_settings.testing`: テストフレームワーク（jest, vitest等）
- `project_settings.styling`: スタイリング（tailwindcss, styled-components等）

#### 2.2 共有ToDoリストの初期化
```bash
cp shared/todos.md.template shared/todos.md
```

編集項目:
- プロジェクト名
- 初期タスクリスト
- カテゴリ名

### 3. エージェント指示書の作成

`instructions/`ディレクトリに各エージェントの指示書を作成:

```bash
# 例: Project Manager用
cat > instructions/pm.md << 'EOF'
# Project Manager Instructions

あなたは[プロジェクト名]の優秀なプロジェクトマネージャーです。

## 役割と責任
[プロジェクト固有の内容を記載]
EOF
```

### 4. Zellijレイアウトのカスタマイズ（オプション）

`my-squad.kdl`を編集して、エージェントの数や役割を調整:

```kdl
# 例: 3エージェント構成
layout {
    pane split_direction="horizontal" {
        pane {
            name "🏗️ Architect"
            command "bash" "-c" "node agent.js 'あなたはシステムアーキテクトです。'; exec bash"
        }
        pane {
            name "🧑‍💻 Developer"
            command "bash" "-c" "node agent.js 'あなたは開発者です。'; exec bash"
        }
        pane {
            name "🧪 Tester"
            command "bash" "-c" "node agent.js 'あなたはQAエンジニアです。'; exec bash"
        }
    }
}
```

## 📋 チェックリスト

- [ ] `settings.local.json`を作成し、プロジェクト設定を記入
- [ ] `shared/todos.md`を初期化
- [ ] 各エージェントの指示書を`instructions/`に作成
- [ ] 必要に応じて`my-squad.kdl`をカスタマイズ
- [ ] `npm install`で依存関係をインストール
- [ ] `.gitignore`に`settings.local.json`が含まれていることを確認
- [ ] READMEをプロジェクト用に更新

## 🎯 使用開始

### 個別エージェントのテスト
```bash
node agent.js "テストメッセージ"
```

### Zellijでの起動
```bash
zellij action new-tab --layout ./my-squad.kdl
```

### 簡易テスト
```bash
./simple-test.sh
```

## 🔧 カスタマイズのヒント

### エージェント数の変更
- 2エージェント: PM + Developer
- 3エージェント: PM + Frontend + Backend
- 4エージェント: PM + Developer + Designer + Reviewer（デフォルト）
- 5エージェント以上: DevOps、Data Engineer等を追加

### プロジェクトタイプ別の推奨構成

#### Webアプリケーション
- PM, Frontend Developer, Backend Developer, UI/UX Designer

#### モバイルアプリ
- PM, iOS Developer, Android Developer, Backend Developer

#### データ分析プロジェクト
- PM, Data Engineer, Data Analyst, ML Engineer

#### APIプロジェクト
- PM, Backend Developer, DevOps Engineer, API Designer

## 📚 ドキュメント

- `agent.js`: エージェントシステムのコア実装
- `test-agent.js`: 自動テストスクリプト
- `simple-test.sh`: インタラクティブテスト
- `instructions/README.md`: 指示書作成ガイド

## ⚠️ 注意事項

1. `settings.local.json`は`.gitignore`に含めてください（機密情報を含む可能性）
2. `shared/messages/`ディレクトリは定期的にクリーンアップしてください
3. Claude CLIがインストールされていることを確認してください
4. Node.js 18.0.0以上が必要です