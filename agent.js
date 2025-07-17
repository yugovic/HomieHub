#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const readline = require('readline');

// ������nyr-�
const AGENT_ROLES = {
  pm: {
    name: "Project Manager",
    instruction: "instructions/pm.md",
    color: "\x1b[36m", // Cyan
    emoji: ">5"
  },
  developer: {
    name: "Developer",
    instruction: "instructions/developer.md",
    color: "\x1b[32m", // Green
    emoji: ">�=�"
  },
  designer: {
    name: "UI Designer",
    instruction: "instructions/designer.md",
    color: "\x1b[35m", // Magenta
    emoji: "<�"
  },
  reviewer: {
    name: "Code Reviewer",
    instruction: "instructions/reviewer.md",
    color: "\x1b[33m", // Yellow
    emoji: "=@"
  }
};

// ������pK�yrh�û���֗
const args = process.argv.slice(2);
const roleMessage = args[0] || "Bj_o��n��ˢgY";

// yr�y�
let currentRole = null;
for (const [key, role] of Object.entries(AGENT_ROLES)) {
  if (roleMessage.includes(role.name) || roleMessage.includes(role.emoji)) {
    currentRole = { ...role, key };
    break;
  }
}

// �թ�����
if (!currentRole) {
  currentRole = {
    key: 'default',
    name: "Agent",
    color: "\x1b[37m",
    emoji: ">"
  };
}

// �p
function log(message, type = 'info') {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const prefix = `${currentRole.color}[${timestamp}] ${currentRole.emoji} ${currentRole.name}:\x1b[0m`;
  console.log(`${prefix} ${message}`);
}

// q	ǣ���n��h\
const SHARED_DIR = path.join(__dirname, 'shared');
const MESSAGES_DIR = path.join(SHARED_DIR, 'messages');
const TODOS_FILE = path.join(SHARED_DIR, 'todos.md');

function ensureDirectories() {
  if (!fs.existsSync(SHARED_DIR)) {
    fs.mkdirSync(SHARED_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_DIR)) {
    fs.mkdirSync(MESSAGES_DIR, { recursive: true });
  }
  if (!fs.existsSync(TODOS_FILE)) {
    fs.writeFileSync(TODOS_FILE, '# Shared ToDo List\n\n## Tasks\n\n');
  }
}

// �û��n�
function sendMessage(to, message) {
  const messageFile = path.join(MESSAGES_DIR, `${currentRole.key}_to_${to}_${Date.now()}.txt`);
  fs.writeFileSync(messageFile, JSON.stringify({
    from: currentRole.key,
    to: to,
    message: message,
    timestamp: new Date().toISOString()
  }, null, 2));
  log(`Message sent to ${to}: ${message}`, 'send');
}

// �û��n��
function checkMessages() {
  if (!fs.existsSync(MESSAGES_DIR)) return [];
  
  const files = fs.readdirSync(MESSAGES_DIR);
  const myMessages = files.filter(file => file.includes(`_to_${currentRole.key}_`));
  
  const messages = [];
  myMessages.forEach(file => {
    const content = fs.readFileSync(path.join(MESSAGES_DIR, file), 'utf8');
    try {
      const message = JSON.parse(content);
      messages.push(message);
      // ��c_�û��oJd
      fs.unlinkSync(path.join(MESSAGES_DIR, file));
    } catch (e) {
      console.error(`Error reading message ${file}:`, e);
    }
  });
  
  return messages;
}

// Claude CLInw�
function startClaude() {
  log("Starting Claude CLI...", 'system');
  
  // :�n��
  let instruction = roleMessage;
  if (currentRole.instruction && fs.existsSync(currentRole.instruction)) {
    instruction = fs.readFileSync(currentRole.instruction, 'utf8');
  }
  
  // Claude CLI�w�
  const claudeProcess = spawn('claude', ['--dangerous-mode-skip-permissions'], {
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  claudeProcess.on('error', (err) => {
    log(`Failed to start Claude: ${err.message}`, 'error');
  });
  
  claudeProcess.on('exit', (code) => {
    log(`Claude process exited with code ${code}`, 'system');
    process.exit(code);
  });
  
  // :n�Łk�Xf	
  setTimeout(() => {
    log(`Role: ${roleMessage}`, 'system');
  }, 2000);
}

// ���ƣ����
function startInteractiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${currentRole.emoji} > `
  });
  
  log(`Interactive mode started. Type 'help' for commands.`, 'system');
  rl.prompt();
  
  rl.on('line', (line) => {
    const input = line.trim();
    const [command, ...args] = input.split(' ');
    
    switch (command) {
      case 'help':
        console.log(`
Available commands:
  send <agent> <message> - Send a message to another agent
  check                  - Check for new messages
  todo                   - View shared todo list
  claude                 - Start Claude CLI
  exit                   - Exit the program
        `);
        break;
        
      case 'send':
        if (args.length < 2) {
          log('Usage: send <agent> <message>', 'error');
        } else {
          const to = args[0];
          const message = args.slice(1).join(' ');
          sendMessage(to, message);
        }
        break;
        
      case 'check':
        const messages = checkMessages();
        if (messages.length === 0) {
          log('No new messages', 'info');
        } else {
          messages.forEach(msg => {
            log(`Message from ${msg.from}: ${msg.message}`, 'receive');
          });
        }
        break;
        
      case 'todo':
        const todos = fs.readFileSync(TODOS_FILE, 'utf8');
        console.log(todos);
        break;
        
      case 'claude':
        startClaude();
        return;
        
      case 'exit':
        process.exit(0);
        
      default:
        if (input) {
          log(`Unknown command: ${command}. Type 'help' for available commands.`, 'error');
        }
    }
    
    rl.prompt();
  });
  
  // ��k�û�����ï
  setInterval(() => {
    const messages = checkMessages();
    messages.forEach(msg => {
      log(`\nNew message from ${msg.from}: ${msg.message}`, 'receive');
      rl.prompt();
    });
  }, 5000);
}

// ���
function main() {
  log(`Agent started with role: ${currentRole.name}`, 'system');
  ensureDirectories();
  
  // ZellijK�w�U�_4o�ՄkClaude CLI�w�
  if (process.env.ZELLIJ || args.includes('--auto-claude')) {
    startClaude();
  } else {
    // ]��n4o���ƣ���ɒw�
    startInteractiveMode();
  }
}

// ��������
process.on('uncaughtException', (err) => {
  log(`Uncaught exception: ${err.message}`, 'error');
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled rejection at: ${promise}, reason: ${reason}`, 'error');
  process.exit(1);
});

// �L
main();