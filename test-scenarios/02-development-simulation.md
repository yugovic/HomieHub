# テストシナリオ 02: 実際の開発タスクシミュレーション

## テスト目的
実際の開発フローをシミュレートし、エージェント間の協調作業を確認する

## シナリオ：ログイン機能の実装

### 1. PMからの指示

PMのターミナルで、shared/todos.mdを更新：

```markdown
## 🔴 High Priority Tasks

### ログイン機能の実装
- [ ] ログインページのUI作成 (Designer)
- [ ] 認証ロジックの実装 (Developer)
- [ ] フォームバリデーション (Developer)
- [ ] エラーハンドリング (Developer)
- [ ] コードレビュー (Reviewer)
- [ ] 統合テスト (Developer)
```

### 2. タスクの割り振り（PMから各エージェントへ）

```bash
# PM → Designer
send designer ログインページのUIデザインをお願いします。要件：メールとパスワード入力、ログインボタン、エラー表示エリア

# PM → Developer
send developer ログイン機能のバックエンド実装をお願いします。NextAuthを使用してください

# PM → Reviewer
send reviewer ログイン機能の実装が完了したらセキュリティレビューをお願いします
```

### 3. 各エージェントの作業

#### UI Designer
1. ログインページのコンポーネント設計
2. Tailwind CSSでのスタイリング
3. レスポンシブ対応
4. 完了報告をPMへ送信

#### Developer
1. NextAuthの設定
2. APIルートの作成
3. フォームバリデーション実装
4. エラーハンドリング
5. 完了報告をReviewerへ送信

#### Code Reviewer
1. セキュリティチェック
2. コード品質の確認
3. パフォーマンスの評価
4. フィードバックを各エージェントへ送信

### 4. 進捗確認

PMが定期的に状況を確認：
```bash
# 各エージェントへ
send developer 進捗はいかがですか？
send designer UIの実装状況を教えてください
send reviewer レビューの進捗を教えてください
```

## 期待される結果

1. ✅ タスクが適切に分割・割り当てられる
2. ✅ 各エージェントが自分のタスクを認識する
3. ✅ 作業完了時に適切な報告が行われる
4. ✅ レビューフィードバックが共有される
5. ✅ 全体の進捗がToDoリストに反映される

## 実装成果物（想定）

```
homie-hub-app/
├── app/
│   ├── login/
│   │   └── page.tsx        # ログインページ
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts # NextAuth設定
├── components/
│   └── auth/
│       ├── LoginForm.tsx   # ログインフォーム
│       └── ErrorMessage.tsx # エラー表示
└── lib/
    └── auth.ts            # 認証ユーティリティ
```

## 評価基準

- [ ] 役割に応じた適切なタスク分担
- [ ] 効率的なコミュニケーション
- [ ] 実装の品質
- [ ] レビューフィードバックの適切さ
- [ ] 全体の協調性