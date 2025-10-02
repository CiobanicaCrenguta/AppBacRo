import type { ComentariuComplet, Progress } from "@shared/schema";

const COMENTARII_KEY = "comentarii_literare";
const PROGRESS_KEY = "student_progress";

export const storageService = {
  // Comentarii management
  getComentarii(): ComentariuComplet[] {
    const data = localStorage.getItem(COMENTARII_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveComentarii(comentarii: ComentariuComplet[]): void {
    localStorage.setItem(COMENTARII_KEY, JSON.stringify(comentarii));
  },

  getComentariu(id: string): ComentariuComplet | undefined {
    const comentarii = this.getComentarii();
    return comentarii.find((c) => c.comentariu.id === id);
  },

  addComentariu(comentariu: ComentariuComplet): void {
    const comentarii = this.getComentarii();
    comentarii.push(comentariu);
    this.saveComentarii(comentarii);
  },

  updateComentariu(id: string, updatedComentariu: ComentariuComplet): void {
    const comentarii = this.getComentarii();
    const index = comentarii.findIndex((c) => c.comentariu.id === id);
    if (index !== -1) {
      comentarii[index] = updatedComentariu;
      this.saveComentarii(comentarii);
    }
  },

  deleteComentariu(id: string): void {
    const comentarii = this.getComentarii();
    const filtered = comentarii.filter((c) => c.comentariu.id !== id);
    this.saveComentarii(filtered);
  },

  // Progress management
  getProgress(): Progress[] {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProgress(progress: Progress[]): void {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  },

  getComentariuProgress(comentariuId: string): Progress | undefined {
    const progress = this.getProgress();
    return progress.find((p) => p.comentariuId === comentariuId);
  },

  updateProgress(comentariuId: string, nivel: number, scor: number, streak: number, completat: boolean): void {
    const progress = this.getProgress();
    const index = progress.findIndex((p) => p.comentariuId === comentariuId);
    
    const newProgress: Progress = {
      comentariuId,
      nivel,
      scor,
      streak,
      completat,
    };

    if (index !== -1) {
      progress[index] = newProgress;
    } else {
      progress.push(newProgress);
    }

    this.saveProgress(progress);
  },

  initializeWithMockData(mockData: ComentariuComplet[]): void {
    const existing = this.getComentarii();
    if (existing.length === 0) {
      this.saveComentarii(mockData);
    }
  },
};
