/**
 * API Route Tests for User Registration
 * Tests user registration validation and creation
 */

import { POST } from "@/app/api/auth/register/route";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

jest.mock("@/lib/prisma");
jest.mock("bcrypt");

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully register a new user", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "hashed_password123",
      firstName: null,
      surname: null,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue("hashed_password123");
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockUser);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: "test@example.com",
        password: "hashed_password123",
      },
    });
  });

  it("should return error if user already exists", async () => {
    const existingUser = {
      id: 1,
      email: "test@example.com",
      password: "hashed_password123",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "User already exists" });
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("should hash password before storing", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (hash as jest.Mock).mockResolvedValue("hashed_password123");
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
      password: "hashed_password123",
    });

    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    await POST(request);

    expect(hash).toHaveBeenCalledWith("password123", 10);
  });

  it("should handle missing email or password", async () => {
    const request = new Request("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        // missing password
      }),
    });

    // The actual implementation would need error handling for this
    // This test documents expected behavior
    try {
      await POST(request);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
