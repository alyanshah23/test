import { spawn } from 'node:child_process';

const processes = [
  ['server', 'npm', ['run', 'dev', '--prefix', 'server']],
  ['client', 'npm', ['run', 'dev', '--prefix', 'client']],
].map(([name, command, args]) => {
  const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      process.exitCode = code;
    }
  });
  return child;
});

const stop = () => processes.forEach((child) => child.kill('SIGTERM'));
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
