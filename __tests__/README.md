# Test Suite Documentation

## Quick Start

```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test -- --coverage
```

## Test Files Structure

This directory contains the complete test suite for the Simple Nutrition app.

### Directories

- **`api/`** - Tests for Next.js API routes
  - `auth/register.test.ts` - User registration endpoint tests
  - `dish/dish.test.ts` - Dish creation API tests
  - `user/details.test.ts` - User profile retrieval tests

- **`components/`** - React component tests
  - `auth-status.test.tsx` - Authentication status display
  - `form.test.tsx` - Login/register form component
  - `navBar.test.tsx` - Navigation bar component
  - `dataTable.test.tsx` - Data table display component

- **`integration/`** - Integration and workflow tests
  - `api.integration.test.ts` - Complete API workflows with multiple operations

- **`lib/`** - Library and configuration tests
  - `prisma.test.ts` - Prisma client configuration validation

- **`utils/`** - Utility function tests
  - `NutrientHandling.test.ts` - Nutrient combining and sorting functions

- **`setup-env.ts`** - Test environment configuration and global setup

## Files

- **`TEST_TEMPLATES.md`** - Templates and examples for writing new tests
- **`middleware.test.ts`** - Route protection and authentication middleware tests
- **`types.test.ts`** - TypeScript type definition tests

## Writing New Tests

1. **Follow the test template** in `TEST_TEMPLATES.md`
2. **Use AAA pattern**: Arrange → Act → Assert
3. **Mock external dependencies** using jest.mock()
4. **Test user behavior**, not implementation details
5. **Use accessible queries** (getByRole, getByLabelText, etc.)

### Example: Adding a new component test

```bash
# 1. Create test file
touch __tests__/components/MyComponent.test.tsx

# 2. Use template from TEST_TEMPLATES.md
# 3. Run tests
pnpm test MyComponent

# 4. Fix failing tests
# 5. Commit with tests passing
```

## Coverage Targets

- **Branches**: 60%
- **Functions**: 60%
- **Lines**: 60%
- **Statements**: 60%

View coverage:

```bash
pnpm test -- --coverage
```

## Debugging

### Run a single test file

```bash
pnpm test utils/NutrientHandling
```

### Run tests matching a pattern

```bash
pnpm test --testNamePattern="should combine"
```

### Verbose output

```bash
pnpm test -- --verbose
```

### Watch specific file

```bash
pnpm test -- --watch NutrientHandling
```

## CI/CD Integration

Tests run automatically on:

- ✅ Pull requests
- ✅ Commits to main branch
- ✅ Scheduled daily

See `.github/workflows/test.yml` for CI configuration.

## Mocking Reference

### Prisma Database

```typescript
jest
  .mock("@/lib/prisma")(prisma.user.create as jest.Mock)
  .mockResolvedValue(mockData);
```

### NextAuth

```typescript
jest
  .mock("next-auth/react")(useSession as jest.Mock)
  .mockReturnValue({ data: sessionData });
```

### Next Router

```typescript
jest
  .mock("next/navigation")(useRouter as jest.Mock)
  .mockReturnValue({ push: jest.fn() });
```

### External API

```typescript
global.fetch = jest.fn().mockResolvedValue({
  status: 200,
  json: async () => mockData,
});
```

## Best Practices

✅ DO

- Test user-facing behavior
- Use meaningful test descriptions
- Mock external dependencies
- Test error cases
- Keep tests focused and fast
- Clean up mocks between tests

❌ DON'T

- Test implementation details
- Create interdependent tests
- Mock everything (test real logic where possible)
- Use overly specific selectors (test IDs)
- Make unnecessary API calls
- Leave tests in a broken state

## Common Issues & Solutions

**Issue**: Tests timeout

- Solution: Increase jest timeout or check for unresolved promises

**Issue**: Mock not working

- Solution: Ensure mock is defined before import, clear mocks in beforeEach

**Issue**: Component not rendering

- Solution: Check all required props and context providers are mocked

**Issue**: Async test failures

- Solution: Use `waitFor()` for async operations, `async/await` with proper error handling

## Contributing

When adding new features:

1. Write tests first (TDD)
2. Implement feature
3. Ensure all tests pass
4. Commit with tests
5. PR should not decrease coverage

For questions or improvements, refer to `TESTING.md` in the root directory.
