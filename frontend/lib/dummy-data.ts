import type { Board } from "./types";

export const initialBoard: Board = {
  columns: [
    {
      id: "col-1",
      title: "To Do",
      cards: [
        { id: "card-1", title: "Set up project", details: "Initialize repository and dependencies" },
        { id: "card-2", title: "Design UI mockups", details: "Create wireframes for main views" },
      ],
    },
    {
      id: "col-2",
      title: "In Progress",
      cards: [
        { id: "card-3", title: "Implement auth", details: "Add login and registration flow" },
        { id: "card-4", title: "API integration", details: "Connect frontend to backend endpoints" },
      ],
    },
    {
      id: "col-3",
      title: "Review",
      cards: [
        { id: "card-5", title: "Code review", details: "Review PR #42 for dashboard changes" },
      ],
    },
    {
      id: "col-4",
      title: "Done",
      cards: [
        { id: "card-6", title: "Deploy staging", details: "Staging environment is live" },
        { id: "card-7", title: "Update docs", details: "API documentation updated" },
      ],
    },
    {
      id: "col-5",
      title: "Backlog",
      cards: [
        { id: "card-8", title: "Performance audit", details: "Profile and optimize slow queries" },
        { id: "card-9", title: "Mobile responsive", details: "Ensure layout works on small screens" },
      ],
    },
  ],
};
