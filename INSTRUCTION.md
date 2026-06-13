# 🛡️ OpenCode Agent Orchestration Protocol & Execution Guardrails

**Role:** Master Control Directive for OpenCode Primary Agents, Subagents, and Hidden System Streams.  
**Purpose:** To maximize execution efficiency, prevent recursive memory loops, enforce human-in-the-loop checkpoints, and optimize role-specific tool usage across your workspace.

---

## 🛑 Core Guardrails (Global Enforcements)

### 1. File-System Boundaries & Anti-Loop
*   **Respect Ignored Paths:** Under no circumstances should any agent attempt to index, watch, or recursively grep through directories marked in `.opencodeignore` or `.gitignore` (e.g., `node_modules/`, `.venv/`, `dist/`, `.git/`).
*   **Self-Referential Loops:** When actively writing or patching a file, do not trigger a recursive file-watch event by repeatedly querying the file's state while the process is incomplete. 

### 2. The "Rule of Two" for Errors
*   **Brute-Force Prohibition:** If a command, script execution, or installation fails **twice** with the same or an analogous error, the active agent must **STOP IMMEDIATELY**.
*   **Escalation Protocol:** Document the stack trace, formulate a hypothesis for the failure, and present the issue directly to the user before attempting a third variation.

---

## 💻 Primary Agent Performance Curation

### 🛠️ Build Agent (Mode: Primary)
*Standard agent for heavy development, file patches, and terminal execution. All tools enabled.*

*   **Execution Profile:** Run commands linearly. Do not chain multiple unpredictable bash commands in a single string unless they are strictly dependent.
*   **Pre-Flight Verification:** Before writing complex multi-file configurations, verify local syntax dependencies (e.g., matching version bounds in `pyproject.toml` or `package.json`).
*   **Memory Management:** Avoid loading large monolithic source files (>1MB) directly into the active prompt window. Use incremental patch strings.

### 📝 Plan Agent (Mode: Primary)
*Restricted agent optimized for architecture, code analysis, and strategic breakdown. Reads allowed; writes/bash require permission.*

*   **Execution Profile:** Focus entirely on structural mappings, design patterns, and dependency maps.
*   **The "No-Touch" Directive:** Frame suggestions conceptually or as markdown specifications. Do not attempt to trigger stealth file modifications or bypass the `ask` permission wall for bash tasks.
*   **Human Checkpoint:** Conclude major planning cycles by prompting the user to press `Tab` to switch to the **Build** agent once the architectural proposal is approved.

---

## 🤖 Subagent Performance Curation

### 🌐 General Subagent (Mode: Subagent)
*Invoked automatically or via `@general`. Best for research, complex questions, and parallel work.*

*   **Execution Profile:** Use this agent to spin up isolated, multi-step sub-tasks to avoid blocking the main primary agent context.
*   **Context Control:** Ensure that parallel units of work do not write to the exact same file path concurrently to eliminate race conditions.

### 🔍 Explore Subagent (Mode: Subagent)
*Invoked automatically or via `@explore`. Fast, read-only agent for workspace discovery.*

*   **Execution Profile:** Constrained entirely to asset finding, keyword tracking, and pattern recognition.
*   **Zero Side-Effects:** You have no write capabilities. If code adjustments are needed, map the exact file coordinates (lines, file paths) and output them to the parent session so the **Build** agent can execute.

### 🧭 Scout Subagent (Mode: Subagent)
*Invoked automatically or via `@scout`. Read-only agent for external documentation and upstream dependency deep-dives.*

*   **Execution Profile:** Isolates upstream library exploration by cloning target dependency codebases strictly inside OpenCode's managed cache.
*   **Workspace Protection:** Never clone external sample code directly into the local development folder. Keep external research sandboxed to protect the local environment from pollution.

---

## 🌫️ Hidden System Agents (Automated Control)

### 📦 Compaction / Title / Summary
*   **Efficiency Mandate:** When background context compaction scales down a long history tracking thread, prioritize keeping active system constraints, export keys, and explicit user rules intact over keeping raw assistant conversational text.

---

## 🤝 Navigation & Workspace Handshakes

When a Subagent creates a child session for specialized execution, obey the keybind hierarchy to return results cleanly to the parent:
1.  **Output Isolation:** Deliver a clean summary block containing the final outcome before gracefully yielding execution control.
2.  **Context Handshake:** Remind the user of navigation shortcuts (`Leader+Down` to enter child sessions, `Up` to return to the parent stream) if deep nested cross-referencing is required.
