# Multi-Agent Development System Template

AIエージェントが協調して開発を進めるマルチエージェントシステムのテンプレートです。

## 概要

このテンプレートを使用することで、複数のAIエージェント（Claude Code等）が役割分担しながら協調してソフトウェア開発を行う環境を構築できます。

## 特徴

- 🤖 4つの役割（PM、Developer、Designer、Reviewer）による協調開発
- 💬 エージェント間のメッセージング機能
- 📋 共有ToDoリストによるタスク管理
- 🔒 セキュリティ設定による安全な実行環境
- 🧪 テストスクリプト付き

## セットアップ

詳細なセットアップ手順は [SETUP.md](./SETUP.md) を参照してください。

### クイックスタート

1. テンプレートをコピー
```bash
cp -r multi-agent-template/* your-project/
cd your-project
```

2. 設定ファイルを作成
```bash
cp settings.local.json.template settings.local.json
cp shared/todos.md.template shared/todos.md
```

3. エージェント指示書を作成
```bash
# instructions/ディレクトリに各エージェントの指示書を作成
```

4. 実行
```bash
# Zellijで起動
zellij action new-tab --layout ./my-squad.kdl

# または個別に起動
node agent.js "Project Manager"
```

## ファイル構成

- `agent.js` - エージェントシステムのコア
- `my-squad.kdl` - Zellijレイアウト設定
- `instructions/` - 各エージェントの指示書
- `shared/` - 共有リソース（ToDo、メッセージ）
- `test-agent.js` - 自動テスト
- `simple-test.sh` - インタラクティブテスト
- `SETUP.md` - 詳細セットアップガイド

## カスタマイズ

プロジェクトの性質に応じて以下をカスタマイズできます：

- エージェントの数と役割
- 指示書の内容
- Zellijレイアウト
- セキュリティ設定

## ライセンス

MIT License