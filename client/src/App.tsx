import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import DrillPage from "@/pages/DrillPage";
import EditorPage from "@/pages/EditorPage";
import PracticeByLevelPage from "@/pages/PracticeByLevelPage";
import ViewComentariuPage from "@/pages/ViewComentariuPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/drill/:id" component={DrillPage} />
      <Route path="/editor/:id" component={EditorPage} />
      <Route path="/practice/:nivel" component={PracticeByLevelPage} />
      <Route path="/view/:id" component={ViewComentariuPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <Router />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
