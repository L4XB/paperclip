import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { mergePaperclipEnvEntries, readPaperclipEnvEntries } from "../config/env.js";

describe("paperclip env file round trip", () => {
  it.each([
    "C:\\Users\\nick\\.paperclip-worktrees\\instances\\repo",
    "C:\\Users\\ann\\repos\\app\\.paperclip\\config.json",
    'name with "quotes"',
  ])("reads back %s as written", (value) => {
    const envPath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "paperclip-env-roundtrip-")), ".env");

    mergePaperclipEnvEntries({ PAPERCLIP_HOME: value }, envPath);

    expect(readPaperclipEnvEntries(envPath).PAPERCLIP_HOME).toBe(value);
  });
});
