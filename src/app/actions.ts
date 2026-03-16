"use server";

import { submitCode, getLeaderboard, getAllSubmissionsCount } from "@/lib/queries";

export async function submitCodeAction(code: string, language: string, isRoastMode: boolean) {
  return submitCode(code, language, isRoastMode);
}

export async function getLeaderboardAction(limit?: number) {
  return getLeaderboard(limit);
}

export async function getSubmissionsCountAction() {
  return getAllSubmissionsCount();
}