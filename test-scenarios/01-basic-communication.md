# テストシナリオ 01: 基本的なエージェント間通信

## テスト目的
エージェント間でメッセージの送受信が正しく行われることを確認する

## 前提条件
- agent.jsが正常に動作すること
- shared/messagesディレクトリが存在すること

## テスト手順

### 1. エージェントの起動（4つのターミナルで実行）

```bash
# Terminal 1 - Project Manager
node agent.js "Project Manager"

# Terminal 2 - Developer
node agent.js "Developer"

# Terminal 3 - UI Designer
node agent.js "UI Designer"

# Terminal 4 - Code Reviewer
node agent.js "Code Reviewer"
```

### 2. メッセージ送信テスト

#### PM → Developer
```
# PMのターミナルで実行
send developer ログイン機能の実装をお願いします

# Developerのターミナルで確認
check
```

#### Developer → Reviewer
```
# Developerのターミナルで実行
send reviewer ログイン機能のコードレビューをお願いします

# Reviewerのターミナルで確認
check
```

### 3. 共有ToDoリストの確認

各エージェントで以下を実行：
```
todo
```

## 期待される結果

1. ✅ 各エージェントが起動し、役割に応じた色とアイコンが表示される
2. ✅ sendコマンドでメッセージが送信される
3. ✅ checkコマンドで新着メッセージが表示される
4. ✅ 5秒ごとに自動でメッセージがチェックされる
5. ✅ todoコマンドで共有ToDoリストが表示される

## 確認項目

- [ ] メッセージファイルがshared/messagesに作成される
- [ ] メッセージを読み取った後、ファイルが削除される
- [ ] 異なるエージェント間でメッセージが正しく送受信される
- [ ] エラーハンドリングが適切に動作する