import { db } from "./db";
import {
  users, blogPosts, contactSubmissions, seoSettings,
  type User, type InsertUser,
  type ContactSubmission, type InsertContact,
  type BlogPost, type InsertBlog,
  type SeoSetting, type InsertSeo,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;

  getAllBlogs(): Promise<BlogPost[]>;
  getBlogBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogById(id: string): Promise<BlogPost | undefined>;
  createBlog(data: InsertBlog): Promise<BlogPost>;
  updateBlog(id: string, data: Partial<InsertBlog>): Promise<BlogPost>;
  deleteBlog(id: string): Promise<void>;

  getAllSeoSettings(): Promise<SeoSetting[]>;
  getSeoByPageSlug(pageSlug: string): Promise<SeoSetting | undefined>;
  upsertSeoSettings(data: InsertSeo): Promise<SeoSetting>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getAllBlogs(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogById(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlog(data: InsertBlog): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(data).returning();
    return post;
  }

  async updateBlog(id: string, data: Partial<InsertBlog>): Promise<BlogPost> {
    const [post] = await db.update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlog(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getAllSeoSettings(): Promise<SeoSetting[]> {
    return await db.select().from(seoSettings).orderBy(seoSettings.pageSlug);
  }

  async getSeoByPageSlug(pageSlug: string): Promise<SeoSetting | undefined> {
    const [setting] = await db.select().from(seoSettings).where(eq(seoSettings.pageSlug, pageSlug));
    return setting;
  }

  async upsertSeoSettings(data: InsertSeo): Promise<SeoSetting> {
    const existing = await this.getSeoByPageSlug(data.pageSlug);
    if (existing) {
      const [updated] = await db.update(seoSettings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(seoSettings.pageSlug, data.pageSlug))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(seoSettings).values(data).returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
