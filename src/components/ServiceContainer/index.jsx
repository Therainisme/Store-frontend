import styles from "./index.module.css";

export default function ServiceContainer({children}) {
    return (
        <div className={styles.container}>{children}</div>
    )
}