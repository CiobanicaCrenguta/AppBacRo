import type { ComentariuComplet, Progress } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export const storageService = {
  // Comentarii management
  async getComentarii(): Promise<ComentariuComplet[]> {
    try {
      const response = await fetch("/api/comentarii");
      if (!response.ok) {
        throw new Error("Failed to fetch comentarii");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comentarii:", error);
      return [];
    }
  },

  async getComentariu(id: string): Promise<ComentariuComplet | undefined> {
    try {
      const response = await fetch(`/api/comentarii/${id}`);
      if (!response.ok) {
        return undefined;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comentariu:", error);
      return undefined;
    }
  },

  async addComentariu(comentariu: ComentariuComplet): Promise<void> {
    try {
      await apiRequest("POST", "/api/comentarii", comentariu);
    } catch (error) {
      console.error("Error adding comentariu:", error);
      throw error;
    }
  },

  async updateComentariu(
    id: string,
    updatedComentariu: ComentariuComplet
  ): Promise<void> {
    try {
      await apiRequest("PUT", `/api/comentarii/${id}`, updatedComentariu);
    } catch (error) {
      console.error("Error updating comentariu:", error);
      throw error;
    }
  },

  async deleteComentariu(id: string, password: string): Promise<void> {
    try {
      const response = await apiRequest(
        "POST",
        `/api/comentarii/${id}/delete`,
        { password }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete comentariu");
      }
    } catch (error) {
      console.error("Error deleting comentariu:", error);
      throw error;
    }
  },

  // Progress management
  async getProgress(): Promise<Progress[]> {
    try {
      const response = await fetch("/api/progress");
      if (!response.ok) {
        throw new Error("Failed to fetch progress");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching progress:", error);
      return [];
    }
  },

  async getComentariuProgress(
    comentariuId: string
  ): Promise<Progress | undefined> {
    try {
      const response = await fetch(`/api/progress/${comentariuId}`);
      if (!response.ok) {
        return undefined;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching progress:", error);
      return undefined;
    }
  },

  async updateProgress(
    comentariuId: string,
    nivel: number,
    scor: number,
    streak: number,
    completat: boolean
  ): Promise<void> {
    try {
      await apiRequest("POST", "/api/progress", {
        comentariuId,
        nivel,
        scor,
        streak,
        completat,
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      throw error;
    }
  },

  async initializeWithMockData(
    mockData: ComentariuComplet[]
  ): Promise<void> {
    const existing = await this.getComentarii();
    if (existing.length === 0) {
      for (const comentariu of mockData) {
        await this.addComentariu(comentariu);
      }
    }
  },

  // Legacy methods for backward compatibility (not used anymore)
  saveComentarii(_comentarii: ComentariuComplet[]): void {
    // No-op, data is now saved via API
  },

  saveProgress(_progress: Progress[]): void {
    // No-op, data is now saved via API
  },
};
