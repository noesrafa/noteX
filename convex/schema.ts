import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    heading: v.string(),
    user_id: v.string(),
    is_archived: v.boolean(),
    parent_note: v.optional(v.id("notes")),
    content: v.optional(v.string()),
    cover_img: v.optional(v.string()),
    icon: v.optional(v.string()),
    isShared: v.optional(v.boolean()),
  })
    .index("by_user", ["user_id"])
    .index("by_user_parent", ["user_id", "parent_note"]),
});
