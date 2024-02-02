import MealsGrid from "@/components/meals/meals-grid";
import Link from "next/link";
import classes from "./page.module.css";
import getMeals from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: "All Meals",
  description: "Browse our delecious meals shared by our community.",
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delecious Meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favourite recipe and cook it your self</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favourite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
