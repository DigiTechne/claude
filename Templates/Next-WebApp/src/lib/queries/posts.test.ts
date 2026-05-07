import { describe, it, expect, vi, beforeEach } from "vitest";

const mockChain = {
  from: vi.fn(),
  where: vi.fn(),
  limit: vi.fn().mockResolvedValue([]),
};
mockChain.from.mockReturnValue({
  ...mockChain,
  then: (resolve: (v: unknown[]) => void) => resolve([]),
});
mockChain.where.mockReturnThis();

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn(() => mockChain),
  },
}));

import { getPostById, getAllPosts } from "./posts";

describe("posts queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPostById returns null when not found", async () => {
    const result = await getPostById("nonexistent-id");
    expect(result).toBeNull();
  });

  it("getAllPosts returns an array", async () => {
    const result = await getAllPosts();
    expect(Array.isArray(result)).toBe(true);
  });
});
