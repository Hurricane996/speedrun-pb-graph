import React, {FC} from "react";
import styles from "./Alerts.module.css";

interface ErrorProps {
    error: string;
}

export const ErrorAlert : FC<ErrorProps> = ({error} : ErrorProps) => (
    <div className={`${styles.alert} ${styles.error}`}>An error occured: {error}</div>
);

export const LoadingAlert: FC = () => (
    <div className={`${styles.alert} ${styles.loading}`}>Loading...</div>
);