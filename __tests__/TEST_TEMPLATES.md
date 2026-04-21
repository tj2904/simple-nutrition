/\*\*

- Test Template Examples
- Use these as templates when creating new tests
  \*/

// ============================================================================
// UNIT TEST TEMPLATE (for utility functions)
// ============================================================================

/\*
import { myFunction } from '@/utils/myFunction'

describe('myFunction', () => {
it('should do something expected', () => {
// Arrange
const input = { /_ setup _/ }

    // Act
    const result = myFunction(input)

    // Assert
    expect(result).toEqual({ /* expected */ })

})

it('should handle edge case', () => {
const input = null
expect(() => myFunction(input)).toThrow('Expected error message')
})
})
\*/

// ============================================================================
// API ROUTE TEST TEMPLATE
// ============================================================================

/\*
import { POST } from '@/app/api/route/route'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma')

describe('POST /api/route', () => {
beforeEach(() => {
jest.clearAllMocks()
})

it('should handle successful request', async () => {
// Mock database call
(prisma.model.create as jest.Mock).mockResolvedValue({
id: 1,
field: 'value'
})

    const request = new Request('http://localhost/api/route', {
      method: 'POST',
      body: JSON.stringify({ /* request data */ })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

})

it('should handle error case', async () => {
(prisma.model.create as jest.Mock).mockRejectedValue(
new Error('Database error')
)

    // Test error handling
    await expect(prisma.model.create()).rejects.toThrow('Database error')

})
})
\*/

// ============================================================================
// COMPONENT TEST TEMPLATE (Client Component)
// ============================================================================

/\*
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '@/components/MyComponent'

jest.mock('next/navigation')
jest.mock('next-auth/react')

describe('MyComponent', () => {
it('should render correctly', () => {
render(<MyComponent />)
expect(screen.getByText('Expected Text')).toBeInTheDocument()
})

it('should handle user interaction', async () => {
render(<MyComponent />)

    const button = screen.getByRole('button', { name: /click me/i })
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Updated Text')).toBeInTheDocument()
    })

})

it('should handle form submission', async () => {
render(<MyComponent />)

    const input = screen.getByLabelText(/input label/i)
    await userEvent.type(input, 'test value')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalledWith('test value')
    })

})
})
\*/

// ============================================================================
// MIDDLEWARE TEST TEMPLATE
// ============================================================================

/\*
import middleware from '@/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

jest.mock('next-auth/jwt')

describe('middleware', () => {
const createRequest = (pathname: string) => {
const url = new URL(`http://localhost:3000${pathname}`)
return new NextRequest(url)
}

beforeEach(() => {
jest.clearAllMocks()
})

it('should protect authenticated routes', async () => {
(getToken as jest.Mock).mockResolvedValue(null)

    const request = createRequest('/protected')
    const response = await middleware(request)

    expect(response.status).toBe(307)

})
})
\*/

// ============================================================================
// INTEGRATION TEST TEMPLATE
// ============================================================================

/\*
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma')

describe('Feature Integration', () => {
it('should handle complete workflow', async () => {
// Setup - Create user
(prisma.user.create as jest.Mock).mockResolvedValue({
id: 1,
email: 'test@example.com'
})

    // Execute - Perform action
    const user = await (prisma.user.create as jest.Mock)({
      data: { email: 'test@example.com' }
    })

    // Verify - Check results
    expect(user.id).toBe(1)

})
})
\*/

// ============================================================================
// BEST PRACTICES
// ============================================================================

/\*

1. Use meaningful test descriptions
   ✓ it('should return user by email')
   ✗ it('tests the function')

2. Follow AAA pattern (Arrange, Act, Assert)
   - Arrange: Set up test data
   - Act: Call the function/component
   - Assert: Verify results

3. Test one thing per test
   ✓ it('should validate email format')
   ✗ it('should validate email and password')

4. Use beforeEach to clear mocks
   beforeEach(() => {
   jest.clearAllMocks()
   })

5. Mock external dependencies
   jest.mock('next-auth/react')
   jest.mock('@/lib/prisma')

6. Test user behavior, not implementation
   ✓ fireEvent.click(screen.getByRole('button'))
   ✗ component.handleClick()

7. Use accessible queries
   ✓ screen.getByRole('button', { name: /submit/i })
   ✓ screen.getByLabelText(/email/i)
   ✗ screen.getByTestId('button-123')

8. Test error cases
   it('should handle errors gracefully')
   it('should display error message')

9. Clean up after tests
   afterEach(() => {
   jest.clearAllMocks()
   })

10. Keep tests focused and fast - Avoid unnecessary async operations - Mock external API calls - Use small test data
    \*/
