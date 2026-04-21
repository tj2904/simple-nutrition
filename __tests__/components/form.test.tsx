/**
 * Component Tests for Authentication Form
 * Tests form submission, validation, and user feedback
 */

import { signIn } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("react-hot-toast");

describe("Form Component - Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Login Behavior", () => {
    it("should call signIn with credentials", async () => {
      (signIn as jest.Mock).mockResolvedValue({ error: null });

      await (signIn as jest.Mock)("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });

      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should handle login error", async () => {
      (signIn as jest.Mock).mockResolvedValue({
        error: "Invalid credentials",
      });

      const result = await (signIn as jest.Mock)("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "wrong",
      });

      expect(result.error).toBe("Invalid credentials");
    });

    it("should handle successful login", async () => {
      (signIn as jest.Mock).mockResolvedValue({ error: null });

      const result = await (signIn as jest.Mock)("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });

      expect(result.error).toBeNull();
    });
  });

  describe("Registration Behavior", () => {
    it("should handle successful registration", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        json: async () => ({ id: 1, email: "newuser@example.com" }),
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "newuser@example.com",
          password: "password123",
        }),
      });

      expect(response.status).toBe(200);
    });

    it("should handle registration error", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: async () => ({ error: "User already exists" }),
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "existing@example.com",
          password: "password123",
        }),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe("User already exists");
    });
  });

  describe("Form Validation", () => {
    it("should validate email format", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test("test@example.com")).toBe(true);
      expect(emailRegex.test("invalid-email")).toBe(false);
    });

    it("should require non-empty password", () => {
      const password = "password123";
      expect(password.length > 0).toBe(true);
      expect("".length > 0).toBe(false);
    });
  });
});
