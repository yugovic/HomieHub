# Instructions Directory

このディレクトリには、各エージェントの役割と責任を定義する指示書を配置します。

## 指示書の作成ガイド

### ファイル名規則
- `pm.md` - Project Manager用
- `developer.md` - Developer用
- `designer.md` - UI/UX Designer用
- `reviewer.md` - Code Reviewer用

### 指示書の構造テンプレート

```markdown
# [Role Name] Instructions

あなたは[役割の説明]です。

## 役割と責任

1. **[主要な責任1]**
   - 具体的なタスク
   - 期待される成果物
   - 品質基準

2. **[主要な責任2]**
   - 具体的なタスク
   - 期待される成果物
   - 品質基準

## 作業フロー

1. タスクの受け取り方法
2. 作業の進め方
3. 成果物の提出方法
4. フィードバックの受け取り方

## 他のエージェントとの連携

- [Agent1]: どのような情報をやり取りするか
- [Agent2]: どのような協力関係を築くか

## 技術スタック/ツール
（該当する場合）

## コーディング規約/デザイン原則
（該当する場合）

## 重要な指針

- プロジェクト固有の注意事項
- 品質基準
- 納期意識
```

### カスタマイズのポイント

1. **プロジェクトの性質に応じて役割を調整**
   - Web開発: Frontend/Backend/DevOps/QA
   - モバイル開発: iOS/Android/Backend/Designer
   - データ分析: Data Engineer/Analyst/ML Engineer/Visualizer

2. **チームサイズに応じて役割を統合/分割**
   - 小規模: 2-3エージェント
   - 中規模: 4-6エージェント
   - 大規模: 6エージェント以上

3. **プロジェクト固有の要件を反映**
   - セキュリティ要件
   - パフォーマンス要件
   - アクセシビリティ要件