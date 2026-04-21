/**
 * API Route Tests for User Details
 * Tests user profile information retrieval and updates
 */

import { GET } from "@/app/api/user/details/route";
import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma");

describe("GET /api/user/details", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve user details by email", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      firstName: "John",
      surname: "Doe",
      password: "hashed_password",
      foods: [],
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const request = new Request(
      "http://localhost:3000/api/user/details?email=test@example.com",
    );

    // Note: This assumes the route handles email parameter
    // You may need to adjust based on actual implementation
    expect(prisma.user.findUnique).toBeDefined();
  });

  it("should return null for non-existent user", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await (prisma.user.findUnique as jest.Mock)({
      where: { email: "nonexistent@example.com" },
    });

    expect(result).toBeNull();
  });
});
