import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    heading: v.string(),
    parent_note: v.optional(v.id("notes")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not logged in");
    }

    const user_id = identity.subject;

    const note = await ctx.db.insert("notes", {
      heading: args.heading,
      parent_note: args.parent_note,
      user_id,
      is_archived: false,
      isShared: false,
    });

    return note;
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not logged in");
    }

    const notes = await ctx.db.query("notes").collect();

    return notes;
  },
});

export const getSidebar = query({
  args: {
    parent_note: v.optional(v.id("notes")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not logged in");
    }

    const user_id = identity.subject;

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user_parent", (q) =>
        q.eq("user_id", user_id).eq("parent_note", args.parent_note)
      )
      .filter((q) => q.eq(q.field("is_archived"), false))
      .order("desc")
      .collect();

    return notes;
  },
});
