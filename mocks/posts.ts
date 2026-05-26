import type { Post, PostReply } from "@/lib/types";
import { getMockCurrentUser } from "@/mocks/user";

const user = getMockCurrentUser();

const mockPosts: Post[] = [
  {
    id: "post-001",
    author: {
      id: user.id,
      displayName: user.displayName,
      avatarInitials: user.avatarInitials,
    },
    gearUsed: ["Celestron NexStar 8SE", "Tele Vue Delos 10mm"],
    body:
      "Short moon-window tonight but still caught a clean view of M13 before haze rolled in. The core resolved nicely at medium magnification.",
    reactionCount: 34,
    commentCount: 7,
    createdAtIso: "2026-05-22T03:15:00.000Z",
  },
  {
    id: "post-002",
    author: {
      id: "user-002",
      displayName: "Ari Patel",
      avatarInitials: "AP",
    },
    gearUsed: ["Sky-Watcher 80ED", "ASI533MC Pro"],
    body:
      "Captured a 90-minute stack on M51 from my driveway. Light pollution was rough but deconvolution helped pull out the bridge detail.",
    imageUrl: "mock-image-m51-stack",
    reactionCount: 58,
    commentCount: 12,
    createdAtIso: "2026-05-21T05:42:00.000Z",
  },
  {
    id: "post-003",
    author: {
      id: "user-003",
      displayName: "Lena Cho",
      avatarInitials: "LC",
    },
    gearUsed: ["Canon EOS Ra", "Star Adventurer GTi"],
    body:
      "Quick checklist for breezy nights: extra counterweight check, dew strap test, and one lower tripod spreader notch for stability.",
    reactionCount: 21,
    commentCount: 3,
    createdAtIso: "2026-05-20T23:05:00.000Z",
  },
];

const mockRepliesByPostId: Record<string, PostReply[]> = {
  "post-001": [
    {
      id: "reply-001",
      postId: "post-001",
      authorId: "user-002",
      authorDisplayName: "Ari Patel",
      authorAvatarInitials: "AP",
      body: "Great catch on M13. Did you use any light-pollution filter on that run?",
      createdAtIso: "2026-05-22T03:31:00.000Z",
    },
    {
      id: "reply-002",
      postId: "post-001",
      authorId: "user-003",
      authorDisplayName: "Lena Cho",
      authorAvatarInitials: "LC",
      body: "That seeing report sounds ideal. I may try the same window tomorrow night.",
      createdAtIso: "2026-05-22T03:54:00.000Z",
    },
  ],
  "post-002": [
    {
      id: "reply-003",
      postId: "post-002",
      authorId: "user-001",
      authorDisplayName: "Nirmal Shah",
      authorAvatarInitials: "NS",
      body: "Bridge detail looks clean. Curious what your final integration time was.",
      createdAtIso: "2026-05-21T06:02:00.000Z",
    },
  ],
  "post-003": [
    {
      id: "reply-004",
      postId: "post-003",
      authorId: "user-001",
      authorDisplayName: "Nirmal Shah",
      authorAvatarInitials: "NS",
      body: "The tripod spreader tip is underrated. Helped a lot on windy lakefront nights.",
      createdAtIso: "2026-05-21T00:14:00.000Z",
    },
  ],
};

export function getMockPosts(): Post[] {
  return mockPosts;
}

export function getMockPostById(postId: string): Post | undefined {
  return mockPosts.find((post) => post.id === postId);
}

export function getMockRepliesByPostId(postId: string): PostReply[] {
  return mockRepliesByPostId[postId] ?? [];
}
