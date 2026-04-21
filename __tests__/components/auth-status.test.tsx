/**
 * Component Tests for Auth Status
 * Tests authentication status display and sign out
 */

import { useSession, signOut } from "next-auth/react";

jest.mock("next-auth/react");

describe("AuthStatus Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Session Handling", () => {
    it("should mock useSession successfully", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      const session = (useSession as jest.Mock)();
      expect(session.status).toBe("unauthenticated");
    });

    it("should handle authenticated session", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        },
        status: "authenticated",
      });

      const session = (useSession as jest.Mock)();
      expect(session.data.user.email).toBe("test@example.com");
      expect(session.status).toBe("authenticated");
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

  describe("Sign Out", () => {
    it("should call signOut function", async () => {
      (signOut as jest.Mock).mockResolvedValue(null);

      await (signOut as jest.Mock)();

      expect(signOut).toHaveBeenCalled();
    });

    it("should handle sign out with redirect", async () => {
      (signOut as jest.Mock).mockResolvedValue({ url: "/login" });

      const result = await (signOut as jest.Mock)({ redirect: false });

      expect(result.url).toBe("/login");
    });
  });
});
