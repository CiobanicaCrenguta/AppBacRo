import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { ComentariuComplet } from "@shared/schema";

// Hardcoded password for deleting comentarii
const DELETE_PASSWORD = "GeorgeAndoneVasiliu";

export async function registerRoutes(app: Express): Promise<Server> {
  // Comentarii routes
  app.get("/api/comentarii", async (_req, res) => {
    try {
      const comentarii = await storage.getComentarii();
      res.json(comentarii);
    } catch (error) {
      console.error("Error fetching comentarii:", error);
      res.status(500).json({ error: "Failed to fetch comentarii" });
    }
  });

  app.get("/api/comentarii/:id", async (req, res) => {
    try {
      const comentariu = await storage.getComentariu(req.params.id);
      if (!comentariu) {
        return res.status(404).json({ error: "Comentariu not found" });
      }
      res.json(comentariu);
    } catch (error) {
      console.error("Error fetching comentariu:", error);
      res.status(500).json({ error: "Failed to fetch comentariu" });
    }
  });

  app.post("/api/comentarii", async (req, res) => {
    try {
      const comentariu: ComentariuComplet = req.body;
      const created = await storage.addComentariu(comentariu);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating comentariu:", error);
      res.status(500).json({ error: "Failed to create comentariu" });
    }
  });

  app.put("/api/comentarii/:id", async (req, res) => {
    try {
      const comentariu: ComentariuComplet = req.body;
      const updated = await storage.updateComentariu(req.params.id, comentariu);
      if (!updated) {
        return res.status(404).json({ error: "Comentariu not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating comentariu:", error);
      res.status(500).json({ error: "Failed to update comentariu" });
    }
  });

  app.post("/api/comentarii/:id/delete", async (req, res) => {
    try {
      const { password } = req.body;

      // Validate password
      if (password !== DELETE_PASSWORD) {
        return res.status(403).json({ error: "Parolă incorectă" });
      }

      const deleted = await storage.deleteComentariu(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Comentariu not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting comentariu:", error);
      res.status(500).json({ error: "Failed to delete comentariu" });
    }
  });

  // Progress routes
  app.get("/api/progress", async (_req, res) => {
    try {
      const progress = await storage.getProgress();
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.get("/api/progress/:comentariuId", async (req, res) => {
    try {
      const progress = await storage.getComentariuProgress(
        req.params.comentariuId
      );
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const { comentariuId, nivel, scor, streak, completat } = req.body;
      const progress = await storage.updateProgress(
        comentariuId,
        nivel,
        scor,
        streak,
        completat
      );
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
