# Instructions for MCP Server to Operate WinCC OA

## Purpose

This instruction serves to provide an MCP server (Machine-Control-Process-Server) with the fundamentals and required interfaces for interacting with the SCADA system **WinCC OA** (Siemens SIMATIC WinCC Open Architecture).

---

## 1. What is WinCC OA?

WinCC OA is a **modular, object-oriented SCADA system** used for **visualization, control, and monitoring of industrial processes**. It is highly configurable, allows distributed systems, and supports extensive interfaces to third-party systems via protocols such as OPC UA, Modbus, BACnet, REST, SQL, and more.

---

## 2. Basic Principles of Operation

An MCP server that should operate WinCC OA must understand and implement the following principles:

### Project Structure

A WinCC OA project consists of:

- **Managers** (Processes)
- **Panels** (GUI elements)
- **Scripts** (Control Language = CTRL)
- **Data points** (structured variable objects)
- **Alarm systems**

### Data Points

Central objects for representing variables. Each data point has a type (e.g., pump, valve, temperature) and consists of multiple *elements* (e.g., actual value, setpoint, status).

### Manager Management

The individual functions of WinCC OA run in so-called **managers**. Relevant managers:

- `WCCOAui` – User Interface
- `WCCOAevent` – event manager
- `WCCOActrl` – script execution


---

## Documentation Guidelines

**IMPORTANT: Always write and document in English from now on. All documentation, comments, and user-facing content should be in English.**

---

## Critical Development Rules

### WinCC OA Manager Dependency

**CRITICAL**: The `winccoa-manager` package contains proprietary Siemens code that MUST NOT be bundled or distributed with this MCP server package.

**Rules**:
1. **NEVER** add `winccoa-manager` to `dependencies` in package.json - it will bundle the proprietary code
2. **ALWAYS** keep `winccoa-manager` as a `peerDependency` only
3. **For local testing**: Create a separate test setup or use mock implementations
4. **For production**: The postinstall script handles dependency resolution from customer's local WinCC OA installation

**Why**: Including winccoa-manager in dependencies would:
- Bundle proprietary Siemens code in the npm package
- Violate licensing agreements
- Make the package unpublishable to public npm registry

**Local Testing**: To test locally without bundling:
- Use mock implementations of winccoa-manager functions
- Create a separate test environment with isolated dependencies
- Test the postinstall script functionality separately
