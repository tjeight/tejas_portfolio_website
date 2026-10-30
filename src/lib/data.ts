import rawData from "@/data/data.json";
import type { PortfolioData } from "./types";

export const portfolio = rawData as PortfolioData;

export const site = portfolio.site;
export const nav = portfolio.nav;
export const hero = portfolio.hero;
export const sections = portfolio.sections;
export const about = portfolio.about;
export const skills = portfolio.skills;
export const experience = portfolio.experience;
export const projects = portfolio.projects;
export const education = portfolio.education;
export const contact = portfolio.contact;
export const footer = portfolio.footer;
export const ui = portfolio.ui;
