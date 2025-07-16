import { SharedMiddleware } from "../../src/shared/middlewares/shared.middleware";
import { RoleType } from "../../src/user/dto/user.dto";

describe("shared Middleware", () => {
  describe("checkAdmin", () => {
    let middleware: SharedMiddleware;
    const mockUnauthorized = jest.fn();
    const mockHttpResponse = {
      Unauthorized: mockUnauthorized,
    };
    const next = jest.fn();
    beforeEach(() => {
      jest.clearAllMocks();
      middleware = new SharedMiddleware(mockHttpResponse as any);
    });
    test("should call next  if user is ADMIN", () => {
      const req = {
        user: {
          role: RoleType.ADMIN,
        },
      } as any;
      const res = {} as any;
      middleware.checkAdmin(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(mockUnauthorized).not.toHaveBeenCalled();
    });
    test("should call Unauthorized if user is not ADMIN", () => {
      const req = {
        user: {
          role: RoleType.USER,
        },
      } as any;
      const res = {} as any;
      middleware.checkAdmin(req, res, next);
      expect(mockUnauthorized).toHaveBeenCalledWith(res, "unauthorized");
      expect(next).not.toHaveBeenCalled();
    });
  });
});
