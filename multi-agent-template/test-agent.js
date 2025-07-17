#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// テスト用のヘルパー関数
function log(message, type = 'TEST') {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`[${timestamp}] ${type}: ${message}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// テストシナリオ
async function runTests() {
  log('エージェントシステムのテストを開始します', 'START');
  
  // 1. ディレクトリの確認
  log('共有ディレクトリの確認中...', 'CHECK');
  const sharedDir = path.join(__dirname, 'shared');
  const messagesDir = path.join(sharedDir, 'messages');
  const todosFile = path.join(sharedDir, 'todos.md');
  
  if (!fs.existsSync(sharedDir)) {
    log('共有ディレクトリが存在しません', 'ERROR');
    return;
  }
  log('✓ 共有ディレクトリが存在します', 'PASS');
  
  // 2. ToDoファイルの確認
  if (fs.existsSync(todosFile)) {
    log('✓ ToDoファイルが存在します', 'PASS');
    const todos = fs.readFileSync(todosFile, 'utf8');
    log(`ToDoファイルのサイズ: ${todos.length} bytes`, 'INFO');
  } else {
    log('ToDoファイルが存在しません', 'ERROR');
  }
  
  // 3. メッセージディレクトリのクリーンアップ
  if (fs.existsSync(messagesDir)) {
    const files = fs.readdirSync(messagesDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(messagesDir, file));
    });
    log('✓ メッセージディレクトリをクリーンアップしました', 'PASS');
  }
  
  // 4. エージェントの起動テスト
  log('エージェントを起動してインタラクティブモードをテストします', 'TEST');
  
  const agent = spawn('node', ['agent.js', 'テストエージェント'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  let output = '';
  agent.stdout.on('data', (data) => {
    output += data.toString();
  });
  
  agent.stderr.on('data', (data) => {
    log(`エラー出力: ${data}`, 'ERROR');
  });
  
  // helpコマンドを送信
  await sleep(1000);
  agent.stdin.write('help\n');
  
  // checkコマンドを送信
  await sleep(500);
  agent.stdin.write('check\n');
  
  // todoコマンドを送信
  await sleep(500);
  agent.stdin.write('todo\n');
  
  // exitコマンドを送信
  await sleep(500);
  agent.stdin.write('exit\n');
  
  agent.on('close', (code) => {
    if (code === 0) {
      log('✓ エージェントが正常に終了しました', 'PASS');
    } else {
      log(`エージェントが異常終了しました (code: ${code})`, 'ERROR');
    }
    
    // 出力の確認
    if (output.includes('Available commands:')) {
      log('✓ helpコマンドが正常に動作しました', 'PASS');
    }
    if (output.includes('No new messages')) {
      log('✓ checkコマンドが正常に動作しました', 'PASS');
    }
    if (output.includes('Shared ToDo List')) {
      log('✓ todoコマンドが正常に動作しました', 'PASS');
    }
    
    log('テストが完了しました', 'COMPLETE');
  });
}

// 5. マルチエージェント通信テスト
async function runCommunicationTest() {
  log('\n=== マルチエージェント通信テスト ===', 'TEST');
  
  // メッセージをファイルとして作成
  const testMessage = {
    from: 'pm',
    to: 'developer',
    message: 'テストメッセージです',
    timestamp: new Date().toISOString()
  };
  
  const messagesDir = path.join(__dirname, 'shared', 'messages');
  const messageFile = path.join(messagesDir, `pm_to_developer_${Date.now()}.txt`);
  
  fs.writeFileSync(messageFile, JSON.stringify(testMessage, null, 2));
  log('✓ テストメッセージを作成しました', 'PASS');
  
  // メッセージが存在することを確認
  const files = fs.readdirSync(messagesDir);
  if (files.length > 0) {
    log(`✓ メッセージファイルが作成されました: ${files[0]}`, 'PASS');
  }
  
  // クリーンアップ
  fs.unlinkSync(messageFile);
  log('✓ テストメッセージをクリーンアップしました', 'PASS');
}

// メイン実行
async function main() {
  try {
    await runTests();
    await sleep(2000);
    await runCommunicationTest();
  } catch (error) {
    log(`テスト中にエラーが発生しました: ${error.message}`, 'ERROR');
    console.error(error);
  }
}

// 実行
main();