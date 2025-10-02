import { z } from "zod";

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
});

export const ordonareQuestionSchema = z.object({
  id: z.string(),
  fragmente: z.array(z.string()), // fragments in random order
  ordineCorecta: z.array(z.number()), // correct order indices
});

export const completareQuestionSchema = z.object({
  id: z.string(),
  text: z.string(), // text with _____ for blanks
  raspunsuri: z.array(z.string()), // correct answers for each blank
});

export const wordBankQuestionSchema = z.object({
  id: z.string(),
  instructiune: z.string(),
  cuvinte: z.array(z.string()), // word bank
  fraza_corecta: z.string(), // correct sentence
});

export const freeWriteQuestionSchema = z.object({
  id: z.string(),
  instructiune: z.string(),
  raspuns_referinta: z.string(), // reference answer
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
