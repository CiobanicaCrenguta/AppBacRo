import { db } from "./db";
import { comentarii, progress, users } from "@shared/schema";
import type {
  DbComentariu,
  DbProgress,
  ComentariuComplet,
  Drills,
  Progress,
  InsertComentariu,
  InsertProgress,
  User,
  InsertUser,
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // Comentarii methods
  getComentarii(): Promise<ComentariuComplet[]>;
  getComentariu(id: string): Promise<ComentariuComplet | undefined>;
  addComentariu(comentariu: ComentariuComplet): Promise<ComentariuComplet>;
  updateComentariu(
    id: string,
    comentariu: ComentariuComplet
  ): Promise<ComentariuComplet | undefined>;
  deleteComentariu(id: string): Promise<boolean>;

  // Progress methods
  getProgress(): Promise<Progress[]>;
  getComentariuProgress(comentariuId: string): Promise<Progress | undefined>;
  updateProgress(
    comentariuId: string,
    nivel: number,
    scor: number,
    streak: number,
    completat: boolean
  ): Promise<Progress>;

  // User methods (minimal)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class PostgresStorage implements IStorage {
  // Comentarii methods
  async getComentarii(): Promise<ComentariuComplet[]> {
    const dbComentarii = await db.select().from(comentarii);
    return dbComentarii.map((c) => this.dbToComentariuComplet(c));
  }

  async getComentariu(id: string): Promise<ComentariuComplet | undefined> {
    const result = await db
      .select()
      .from(comentarii)
      .where(eq(comentarii.id, id))
      .limit(1);

    if (result.length === 0) return undefined;
    return this.dbToComentariuComplet(result[0]);
  }

  async addComentariu(
    comentariu: ComentariuComplet
  ): Promise<ComentariuComplet> {
    const insertData: InsertComentariu = {
      id: comentariu.comentariu.id,
      titlu: comentariu.comentariu.titlu,
      autor: comentariu.comentariu.autor,
      tip: comentariu.comentariu.tip,
      context: comentariu.comentariu.context,
      trasatura1: comentariu.comentariu.trasatura1,
      trasatura2: comentariu.comentariu.trasatura2,
      tehnici: comentariu.comentariu.tehnici,
      prozodie: comentariu.comentariu.prozodie,
      viziune_despre_viata: comentariu.comentariu.viziune_despre_viata,
      caracterizare_personaje: comentariu.comentariu.caracterizare_personaje,
      incheiere: comentariu.comentariu.incheiere,
      drills: comentariu.drills,
    };

    const result = await db.insert(comentarii).values(insertData).returning();
    return this.dbToComentariuComplet(result[0]);
  }

  async updateComentariu(
    id: string,
    comentariu: ComentariuComplet
  ): Promise<ComentariuComplet | undefined> {
    const updateData: InsertComentariu = {
      id: comentariu.comentariu.id,
      titlu: comentariu.comentariu.titlu,
      autor: comentariu.comentariu.autor,
      tip: comentariu.comentariu.tip,
      context: comentariu.comentariu.context,
      trasatura1: comentariu.comentariu.trasatura1,
      trasatura2: comentariu.comentariu.trasatura2,
      tehnici: comentariu.comentariu.tehnici,
      prozodie: comentariu.comentariu.prozodie,
      viziune_despre_viata: comentariu.comentariu.viziune_despre_viata,
      caracterizare_personaje: comentariu.comentariu.caracterizare_personaje,
      incheiere: comentariu.comentariu.incheiere,
      drills: comentariu.drills,
    };

    const result = await db
      .update(comentarii)
      .set(updateData)
      .where(eq(comentarii.id, id))
      .returning();

    if (result.length === 0) return undefined;
    return this.dbToComentariuComplet(result[0]);
  }

  async deleteComentariu(id: string): Promise<boolean> {
    const result = await db
      .delete(comentarii)
      .where(eq(comentarii.id, id))
      .returning();
    return result.length > 0;
  }

  // Progress methods
  async getProgress(): Promise<Progress[]> {
    const dbProgress = await db.select().from(progress);
    return dbProgress.map((p) => ({
      comentariuId: p.comentariuId,
      nivel: p.nivel,
      scor: p.scor,
      streak: p.streak,
      completat: p.completat,
    }));
  }

  async getComentariuProgress(
    comentariuId: string
  ): Promise<Progress | undefined> {
    const result = await db
      .select()
      .from(progress)
      .where(eq(progress.comentariuId, comentariuId))
      .limit(1);

    if (result.length === 0) return undefined;

    return {
      comentariuId: result[0].comentariuId,
      nivel: result[0].nivel,
      scor: result[0].scor,
      streak: result[0].streak,
      completat: result[0].completat,
    };
  }

  async updateProgress(
    comentariuId: string,
    nivel: number,
    scor: number,
    streak: number,
    completat: boolean
  ): Promise<Progress> {
    const existing = await this.getComentariuProgress(comentariuId);

    const progressData: InsertProgress = {
      comentariuId,
      nivel,
      scor,
      streak,
      completat,
    };

    let result;
    if (existing) {
      result = await db
        .update(progress)
        .set(progressData)
        .where(eq(progress.comentariuId, comentariuId))
        .returning();
    } else {
      result = await db.insert(progress).values(progressData).returning();
    }

    return {
      comentariuId: result[0].comentariuId,
      nivel: result[0].nivel,
      scor: result[0].scor,
      streak: result[0].streak,
      completat: result[0].completat,
    };
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Helper method to convert DB record to ComentariuComplet
  private dbToComentariuComplet(dbComentariu: DbComentariu): ComentariuComplet {
    const drills = dbComentariu.drills || {
      nivel1: [],
      nivel2: [],
      nivel3: [],
      nivel4: [],
      nivel5: [],
    };
    
    return {
      comentariu: {
        id: dbComentariu.id,
        titlu: dbComentariu.titlu,
        autor: dbComentariu.autor,
        tip: dbComentariu.tip as "poezie" | "proza",
        context: dbComentariu.context,
        trasatura1: dbComentariu.trasatura1,
        trasatura2: dbComentariu.trasatura2,
        tehnici: dbComentariu.tehnici,
        prozodie: dbComentariu.prozodie ?? undefined,
        viziune_despre_viata: dbComentariu.viziune_despre_viata ?? undefined,
        caracterizare_personaje:
          dbComentariu.caracterizare_personaje ?? undefined,
        incheiere: dbComentariu.incheiere,
      },
      drills: drills as Drills,
    };
  }
}

export const storage = new PostgresStorage();
