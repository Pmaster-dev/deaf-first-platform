# AI Agents — Deaf-First Platform

This document describes the AI agents used in the Deaf-First Platform ecosystem, their capabilities, constraints, and integration points.

## Overview

The Deaf-First Platform uses AI agents to automate workflows, assist users with accessibility needs, and manage CI/CD processes.

## Agents

### Copilot Coding Agent

- **Purpose**: Automates code changes, CI fixes, PR creation, and repository maintenance.
- **Capabilities**: Code generation, file editing, branch management, PR creation.
- **Constraints**: Cannot push directly; all changes go through GitHub pull requests. Follows repository coding guidelines.

### AI Workspace (`/ai`)

- **Purpose**: Provides AI-powered features for the Deaf-First SaaS platform including sign language recognition and accessibility workflows.
- **Capabilities**: OpenAI API integration, custom model endpoints.
- **Constraints**: API keys must be stored as environment secrets. No hardcoded credentials.

### DeafAuth Service (`Services/deafauth`)

- **Purpose**: Biometric and accessibility-first authentication for deaf and hard-of-hearing users.
- **Capabilities**: Sign language recognition for authentication, accessible MFA.
- **Constraints**: All biometric data must be processed locally; no PII sent to third parties.

### PinkSync Service (`Services/pinksync`)

- **Purpose**: Real-time sign language video synchronization and captioning.
- **Capabilities**: Video stream processing, live caption generation.
- **Constraints**: Video data is not stored beyond session scope.

## Security

- All agents run with the principle of least privilege.
- No agent may commit secrets, credentials, or private keys.
- Agent activity is audited via GitHub Actions logs.

## Contact

For agent-related security concerns, contact: security@mbtq.dev
