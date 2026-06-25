import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm run dev:e2e" : "npm";
const npmArgs = isWindows ? [] : ["run", "dev:e2e"];
const npxCommand = isWindows ? "npx playwright test" : "npx";
const npxArgs = isWindows ? [] : ["playwright", "test"];
const baseUrl = "http://127.0.0.1:3000";

const server = spawn(npmCommand, npmArgs, {
  detached: !isWindows,
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
  },
  shell: isWindows,
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
});

server.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

let exitCode = 1;

try {
  await waitForServer(baseUrl, 120_000);

  exitCode = await runCommand(npxCommand, npxArgs);
} finally {
  await killServer(server.pid);
}

process.exit(exitCode);

async function waitForServer(url, timeoutMs) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      await delay(500);
    }
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      env: process.env,
      shell: isWindows,
      stdio: "inherit",
    });

    child.on("close", (code) => {
      resolve(code ?? 1);
    });
  });
}

function killServer(pid) {
  if (!pid) {
    return Promise.resolve();
  }

  if (isWindows) {
    return new Promise((resolve) => {
      const child = spawn("taskkill", ["/pid", String(pid), "/T", "/F"], {
        stdio: "ignore",
      });

      child.on("close", () => {
        resolve();
      });
    });
  }

  try {
    process.kill(-pid, "SIGTERM");
  } catch {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      return Promise.resolve();
    }
  }

  return Promise.resolve();
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
