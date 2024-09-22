import { Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type projectState = {
  projects: Project[];
};

const initialState: projectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    clearProject(state) {
      state.projects = [];
    },
  },
});

export const { setProjects, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
