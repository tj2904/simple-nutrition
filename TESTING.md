/\*\*

- Comprehensive Testing Guide for Simple Nutrition App
- This document describes the test suite structure and best practices for maintaining tests
  \*/

# Testing Guide for Simple Nutrition

## Overview

This project includes a comprehensive test suite covering:

- **Unit Tests**: Individual function and component testing
- **Integration Tests**: API workflows and data operations
- **Component Tests**: React component rendering and interactions
- **Middleware Tests**: Authentication and route protection

## Test Structure

```
__tests__/
├── api/
│   ├── auth/
│   │   └── register.test.ts          # User registration API
│   └── dish/
│       └── dish.test.ts               # Dish creation API
├── components/
│   ├── auth-status.test.tsx          # Auth status display
│   ├── form.test.tsx                 # Login/register forms
│   └── navBar.test.tsx               # Navigation component
├── integration/
│   └── api.integration.test.ts       # API workflow tests
├── lib/
│   └── prisma.test.ts                # Prisma client configuration
├── utils/
│   └── NutrientHandling.test.ts      # Nutrient utility functions
└── middleware.test.ts                # Route protection middleware
```

## Running Tests

### Local Development

```bash
# Run all tests
pnpm test

# Run tests in watch mode (auto-rerun on file changes)
pnpm test:watch

# Run tests matching a pattern
pnpm test NutrientHandling

# Run a specific file
pnpm test __tests__/utils/NutrientHandling.test.ts
```

### CI/CD Pipeline

```bash
# Run tests with coverage report
pnpm test:ci
```

## Coverage Targets

The project maintains minimum coverage thresholds:

- **Branches**: 60%
- **Functions**: 60%
- **Lines**: 60%
- **Statements**: 60%

Run `pnpm test -- --coverage` to see current coverage metrics.

## Testing Best Practices

### 1. Unit Tests (Utilities)

Test pure functions with various inputs:

- Normal cases
- Edge cases (empty arrays, null values)
- Error conditions

Example:

```typescript
describe('combineNutrientArrays', () => {
  it('should combine multiple nutrient arrays', () => {
    // Arrange
    const input = [...];
    // Act
    const result = combineNutrientArrays(input);
    // Assert
    expect(result).toEqual(...);
  });
});
```

### 2. API Route Tests

Mock Prisma database calls and test:

- Request validation
- Successful operations
- Error handling

Example:

```typescript
describe("POST /api/auth/register", () => {
  it("should successfully register a user", async () => {
    // Mock Prisma
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    // Make request
    const response = await POST(request);

    // Assert response
    expect(response.status).toBe(200);
  });
});
```

### 3. Component Tests

Use React Testing Library for rendering and user interactions:

- Render component
- Query by accessible roles/labels
- Simulate user events

Example:

```typescript
describe('Form Component', () => {
  it('should handle login submission', async () => {
    // Render component
    render(<Form type="login" />);

    // Simulate user input
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');

    // Assert expected behavior
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

### 4. Middleware Tests

Test route protection and redirects:

- Authenticated vs unauthenticated access
- Proper redirects
- Protected routes

## Mocking Strategy

### Database Mocking (Prisma)

```typescript
jest
  .mock("@/lib/prisma")(
    // Then use jest.Mock to set return values
    prisma.user.create as jest.Mock,
  )
  .mockResolvedValue(mockData);
```

### NextAuth Mocking

```typescript
jest
  .mock("next-auth/react")(
    // useSession, signIn, signOut are automatically mocked
    useSession as jest.Mock,
  )
  .mockReturnValue({ data: sessionData });
```

### Router Mocking

```typescript
jest.mock("next/navigation");
// useRouter is automatically mocked with push, refresh, etc.
```

## Common Testing Scenarios

### Testing Async Operations

```typescript
it("should handle async operation", async () => {
  const promise = someAsyncFunction();
  await expect(promise).resolves.toEqual(expectedValue);
});
```

### Testing Error Cases

```typescript
it("should handle error", async () => {
  (prisma.method as jest.Mock).mockRejectedValue(new Error("Failed"));
  await expect(functionThatThrows()).rejects.toThrow("Failed");
});
```

### Testing User Interactions

```typescript
it('should handle form submission', async () => {
  render(<Form />);
  await userEvent.click(screen.getByRole('button'));
  expect(mockHandler).toHaveBeenCalled();
});
```

## When to Add New Tests

### Add tests when:

- Implementing a new feature
- Fixing a bug (add test that reproduces the bug first)
- Modifying existing functionality
- Creating reusable components/utilities

### Test areas before PR approval:

1. **API Routes**: All CRUD operations, validation, error handling
2. **Authentication**: Login, register, protected routes
3. **Components**: User interactions, edge cases, error states
4. **Utilities**: All functions with various inputs
5. **Middleware**: Route protection and redirects

## Debugging Tests

### Run single test

```bash
pnpm test -- testname.test.ts
```

### Run with verbose output

```bash
pnpm test -- --verbose
```

### Debug in VS Code

Add breakpoints and run:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Continuous Integration

GitHub Actions runs tests on:

- Pull requests
- Commits to main branch
- Scheduled daily runs

All tests must pass before merging to main.

## Future Improvements

- [ ] Add E2E tests with Playwright/Cypress
- [ ] Add performance benchmarks
- [ ] Add visual regression tests
- [ ] Increase coverage to 80%+
- [ ] Add snapshot tests for components
- [ ] Add mutation testing for better test quality
