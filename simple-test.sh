#!/bin/bash

echo "=== HomieHub エージェントシステム 簡易テスト ==="
echo ""

# 1. agent.jsの直接実行テスト
echo "1. エージェントのインタラクティブモードテスト"
echo "以下のコマンドを順番に入力してください："
echo "  - help (ヘルプ表示)"
echo "  - todo (ToDoリスト表示)"
echo "  - send developer テストメッセージです"
echo "  - check (メッセージ確認)"
echo "  - exit (終了)"
echo ""
echo "テストを開始します..."
echo ""

node agent.js "あなたはテストエージェントです"