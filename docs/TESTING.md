# Testing Guide

## Overview
This document outlines testing strategies for the project.

## Unit Tests
Unit tests are located in `__tests__` directories next to the source files.

### Running Tests
```bash
npm test
npm test -- --watch
npm test -- --coverage
```

## E2E Tests
End-to-end tests verify complete user flows.

### Key Flows
- User authentication
- Campaign creation
- Task completion
- Screenshot submission

## Mocking
Use MSW (Mock Service Worker) for API mocking in tests.

## Code Coverage
Minimum coverage targets:
- Statements: 70%
- Branches: 60%
- Functions: 70%
- Lines: 70%
