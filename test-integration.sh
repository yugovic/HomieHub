#!/bin/bash

echo "========================================="
echo " HomieHub マルチエージェント統合テスト"
echo "========================================="
echo ""

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# テスト結果を記録するファイル
TEST_LOG="test-results-$(date +%Y%m%d-%H%M%S).log"

# ログ関数
log() {
    echo "$1" | tee -a "$TEST_LOG"
}

# 成功メッセージ
success() {
    echo -e "${GREEN}✓ $1${NC}" | tee -a "$TEST_LOG"
}

# エラーメッセージ
error() {
    echo -e "${RED}✗ $1${NC}" | tee -a "$TEST_LOG"
}

# 警告メッセージ
warning() {
    echo -e "${YELLOW}⚠ $1${NC}" | tee -a "$TEST_LOG"
}

# 情報メッセージ
info() {
    echo -e "${BLUE}ℹ $1${NC}" | tee -a "$TEST_LOG"
}

# テスト1: 環境確認
echo "=== テスト1: 環境確認 ==="
log ""

# Node.jsバージョン確認
NODE_VERSION=$(node --version)
if [[ $? -eq 0 ]]; then
    success "Node.js: $NODE_VERSION"
else
    error "Node.jsが見つかりません"
    exit 1
fi

# agent.jsの存在確認
if [[ -f "agent.js" ]]; then
    success "agent.jsが存在します"
else
    error "agent.jsが見つかりません"
    exit 1
fi

# ディレクトリ構造確認
if [[ -d "shared" && -d "instructions" ]]; then
    success "必要なディレクトリが存在します"
else
    error "必要なディレクトリが不足しています"
    exit 1
fi

echo ""

# テスト2: エージェント起動テスト
echo "=== テスト2: エージェント起動テスト ==="
log ""

info "エージェントを起動してインタラクティブモードをテストします..."

# テスト用のコマンドを作成
cat > test-commands.txt << EOF
help
todo
exit
EOF

# エージェントをテスト実行（macOS対応）
if command -v gtimeout &> /dev/null; then
    gtimeout 5s node agent.js "Test Agent" < test-commands.txt > agent-output.txt 2>&1
elif command -v timeout &> /dev/null; then
    timeout 5s node agent.js "Test Agent" < test-commands.txt > agent-output.txt 2>&1
else
    # timeoutコマンドがない場合は、バックグラウンドで実行して手動でkill
    node agent.js "Test Agent" < test-commands.txt > agent-output.txt 2>&1 &
    AGENT_PID=$!
    sleep 5
    kill $AGENT_PID 2>/dev/null
fi

if grep -q "Available commands:" agent-output.txt; then
    success "エージェントが正常に起動しました"
    success "helpコマンドが動作しています"
else
    error "エージェントの起動に失敗しました"
    cat agent-output.txt >> "$TEST_LOG"
fi

# クリーンアップ
rm -f test-commands.txt agent-output.txt

echo ""

# テスト3: メッセージング機能テスト
echo "=== テスト3: メッセージング機能テスト ==="
log ""

# メッセージディレクトリのクリーンアップ
rm -f shared/messages/*.txt

# メッセージディレクトリが存在することを確認
mkdir -p shared/messages

# テストメッセージの作成
TEST_MESSAGE='{
  "from": "test_pm",
  "to": "test_dev",
  "message": "テストメッセージです",
  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'"
}'

MESSAGE_FILE="shared/messages/test_pm_to_test_dev_$(date +%s).txt"
echo "$TEST_MESSAGE" > "$MESSAGE_FILE"

if [[ -f shared/messages/test_pm_to_test_dev_*.txt ]]; then
    success "メッセージファイルが作成されました"
else
    error "メッセージファイルの作成に失敗しました"
fi

# クリーンアップ
rm -f shared/messages/*.txt

echo ""

# テスト4: 共有ToDoリストテスト
echo "=== テスト4: 共有ToDoリストテスト ==="
log ""

if [[ -f "shared/todos.md" ]]; then
    success "共有ToDoリストが存在します"
    TODO_SIZE=$(wc -c < shared/todos.md)
    info "ToDoリストのサイズ: $TODO_SIZE bytes"
else
    error "共有ToDoリストが見つかりません"
fi

echo ""

# テスト結果サマリー
echo "========================================="
echo " テスト結果サマリー"
echo "========================================="
log ""

TOTAL_TESTS=6
PASSED_TESTS=$(grep -c "✓" "$TEST_LOG")
FAILED_TESTS=$(grep -c "✗" "$TEST_LOG")

echo "総テスト数: $TOTAL_TESTS"
echo "成功: $PASSED_TESTS"
echo "失敗: $FAILED_TESTS"
echo ""

if [[ $FAILED_TESTS -eq 0 ]]; then
    success "すべてのテストが成功しました！"
    echo ""
    info "次のステップ："
    echo "1. Zellijで4つのエージェントを起動："
    echo "   zellij action new-tab --layout ./my-squad.kdl"
    echo ""
    echo "2. または個別に起動："
    echo "   node agent.js 'Project Manager'"
    echo "   node agent.js 'Developer'"
    echo "   node agent.js 'UI Designer'"
    echo "   node agent.js 'Code Reviewer'"
else
    error "いくつかのテストが失敗しました"
    warning "詳細は $TEST_LOG を確認してください"
fi

echo ""
info "テスト結果は $TEST_LOG に保存されました"