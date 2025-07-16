import { AuthService } from "../../src/auth/services/auth.service";
import { UserService } from "../../src/user/services/user.service";
import { mockUser } from "./__fixtures__/auth.fixtures";
import bcrypt from "bcrypt";
import jwt, { sign } from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  let authService: AuthService;
  const mockUserService = {
    findUserWithEmail: jest.fn(),
    findUserWithROle: jest.fn(),
    findUserByUsername: jest.fn(),
  } as unknown as jest.Mocked<UserService>;
  beforeEach(() => {
    authService = new AuthService(mockUserService);
    jest.clearAllMocks();
  });
  describe("validateUser", () => {
    test("should return user if credentials are valid", async () => {
      mockUserService.findUserWithEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await authService.validateUser(
        "test@example.com",
        "password123"
      );
      expect(result).toEqual(mockUser);
      expect(mockUserService.findUserWithEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashed_password"
      );
    });
    test("should return null if user is not found ", async () => {
      mockUserService.findUserWithEmail.mockResolvedValue(null);
      const result = await authService.validateUser("notfound", "password123");
      expect(result).toBeNull();
    });
    test("should return null if password is incorrect", async () => {
      mockUserService.findUserWithEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result = await authService.validateUser(
        "test@example.com",
        "wrongPassword"
      );
      expect(result).toBeNull();
    });
  });
  describe("genJwt", () => {
    test("should return a token and an user with password hidden", async () => {
      mockUserService.findUserWithROle.mockResolvedValue(mockUser);
      const signMock = (jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue(
        "fake_token"
      );
      const result = await authService.genJWT(mockUser);
      expect(mockUserService.findUserWithROle).toHaveBeenCalledWith(
        "any",
        "USER"
      );
      expect(signMock).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: "fake_token",
        user: expect.objectContaining({
          ...mockUser,
          password: "not permission",
        }),
      });
    });
  });
  describe("sign", () => {
    test("should sign the payload with jwt", () => {
      const payload = { sub: "123", role: "ADMIN" };
      const signMock = (jest.spyOn(jwt, "sign") as jest.Mock).mockReturnValue(
        "signed_token"
      );
      const result = authService.sign(payload, "secret");
      expect(result).toBe("signed_token");
      expect(signMock).toHaveBeenCalledWith(payload, "secret");
    });
  });
});
