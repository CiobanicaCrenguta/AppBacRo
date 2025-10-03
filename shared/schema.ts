import { z } from "zod";
import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Commentary structure schema
export const comentariuSchema = z.object({
  id: z.string(),
  titlu: z.string(),
  autor: z.string(),
  tip: z.enum(["poezie", "proza"]),
  context: z.string(),
  trasatura1: z.string(),
  trasatura2: z.string(),
  tehnici: z.string(),
  prozodie: z.string().optional(), // pentru poezie
  viziune_despre_viata: z.string().optional(), // pentru proză
  caracterizare_personaje: z.string().optional(), // pentru proză
  incheiere: z.string(),
});

// Drill types for the 5 levels
export const multipleChoiceQuestionSchema = z.object({
  id: z.string(),
  intrebare: z.string(),
  optiuni: z.array(z.string()),
  raspunsCorect: z.number(), // index of correct answer
  indiciu: z.string().optional(), // hint
});

export const ordonareQuestionSchema = z.object({
  id: z.string(),
  fragmente: z.array(z.string()), // fragments in random order
  ordineCorecta: z.array(z.number()), // correct order indices
  indiciu: z.string().optional(), // hint
});

export const completareQuestionSchema = z.object({
  id: z.string(),
  text: z.string(), // text with _____ for blanks
  raspunsuri: z.array(z.string()), // correct answers for each blank
  indiciu: z.string().optional(), // hint
});

export const wordBankQuestionSchema = z.object({
  id: z.string(),
  instructiune: z.string(),
  cuvinte: z.array(z.string()), // word bank
  fraza_corecta: z.string(), // correct sentence
  indiciu: z.string().optional(), // hint
});

export const freeWriteQuestionSchema = z.object({
  id: z.string(),
  instructiune: z.string(),
  raspuns_referinta: z.string(), // reference answer
  indiciu: z.string().optional(), // hint
});

export const drillsSchema = z.object({
  nivel1: z.array(multipleChoiceQuestionSchema), // Recognition
  nivel2: z.array(ordonareQuestionSchema), // Reconstruction
  nivel3: z.array(completareQuestionSchema), // Cloze
  nivel4: z.array(wordBankQuestionSchema), // Word bank
  nivel5: z.array(freeWriteQuestionSchema), // Free write
});

export const comentariuCompletSchema = z.object({
  comentariu: comentariuSchema,
  drills: drillsSchema,
});

// Progress tracking
export const progressSchema = z.object({
  comentariuId: z.string(),
  nivel: z.number(),
  scor: z.number(),
  streak: z.number(),
  completat: z.boolean(),
});

// PostgreSQL Tables
export const comentarii = pgTable("comentarii", {
  id: text("id").primaryKey(),
  titlu: text("titlu").notNull(),
  autor: text("autor").notNull(),
  tip: text("tip").notNull(), // "poezie" sau "proza"
  context: text("context").notNull(),
  trasatura1: text("trasatura1").notNull(),
  trasatura2: text("trasatura2").notNull(),
  tehnici: text("tehnici").notNull(),
  prozodie: text("prozodie"),
  viziune_despre_viata: text("viziune_despre_viata"),
  caracterizare_personaje: text("caracterizare_personaje"),
  incheiere: text("incheiere").notNull(),
  drills: json("drills").notNull(), // Store drills as JSON
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  comentariuId: text("comentariu_id").notNull(),
  nivel: integer("nivel").notNull(),
  scor: integer("scor").notNull(),
  streak: integer("streak").notNull(),
  completat: boolean("completat").notNull().default(false),
});

// User table (minimal, pentru future use)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertComentariuSchema = createInsertSchema(comentarii);
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true });
export const insertUserSchema = createInsertSchema(users);

// Export types
export type Comentariu = z.infer<typeof comentariuSchema>;
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceQuestionSchema>;
export type OrdonareQuestion = z.infer<typeof ordonareQuestionSchema>;
export type CompletareQuestion = z.infer<typeof completareQuestionSchema>;
export type WordBankQuestion = z.infer<typeof wordBankQuestionSchema>;
export type FreeWriteQuestion = z.infer<typeof freeWriteQuestionSchema>;
export type Drills = z.infer<typeof drillsSchema>;
export type ComentariuComplet = z.infer<typeof comentariuCompletSchema>;
export type Progress = z.infer<typeof progressSchema>;

// Database types
export type DbComentariu = typeof comentarii.$inferSelect;
export type DbProgress = typeof progress.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertComentariu = z.infer<typeof insertComentariuSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
