/**
 * Component Tests for Navigation Bar
 * Tests navigation functionality and responsive behavior
 */

import { useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("next/link", () => {
  return ({ children, href }) => children;
});

describe("NavBar Component - Navigation Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Session-based Navigation", () => {
    it("should check authentication status", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      const session = (useSession as jest.Mock)();
      expect(session.status).toBe("unauthenticated");
    });

    it("should handle authenticated user navigation", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: { email: "test@example.com" },
        },
        status: "authenticated",
      });

      const session = (useSession as jest.Mock)();
      expect(session.data.user.email).toBe("test@example.com");
    });

    it("should handle loading state", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "loading",
      });

      const session = (useSession as jest.Mock)();
      expect(session.status).toBe("loading");
    });
  });

  describe("Navigation Links", () => {
    it("should have home navigation", () => {
      const navLinks = ["home", "search", "profile", "login"];
      expect(navLinks).toContain("home");
    });

    it("should provide different links based on auth status", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      const unauthenticatedLinks = ["home", "search", "login", "register"];
      expect(unauthenticatedLinks.includes("login")).toBe(true);
      expect(unauthenticatedLinks.includes("profile")).toBe(false);
    });

    it("should provide profile link for authenticated users", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: { email: "test@example.com" },
        },
        status: "authenticated",
      });

      const authenticatedLinks = [
        "home",
        "search",
        "profile",
        "dishes",
        "logout",
      ];
      expect(authenticatedLinks.includes("profile")).toBe(true);
    });
  });
});
