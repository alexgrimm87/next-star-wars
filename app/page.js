import Logo from "@/components/Logo/Logo";
import PeopleList from "@/components/PeopleList/PeopleList";
import styles from "./page.module.scss";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Logo />
      <PeopleList />
    </main>
  );
};
