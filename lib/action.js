"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
function isInValidText(text) {
  return !text || text.trim() === "";
}
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    creator_email: formData.get("email"),
    creator: formData.get("name"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
  };

  if (
    isInValidText(meal.title) ||
    isInValidText(meal.creator) ||
    isInValidText(meal.creator_email) ||
    !meal.image ||
    isInValidText(meal.instructions) ||
    isInValidText(meal.summary) ||
    meal.image.size === 0 ||
    !meal.creator_email.includes("@")
  ) {
    return {
      message: "Invalid Input",
    };
  }
  await saveMeal(meal);
  revalidatePath("./meals", "layout");
  redirect("./meals");
}
