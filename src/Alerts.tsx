import React, {FC} from "react";
import Alert from "react-bootstrap/esm/Alert";

interface ErrorProps {
    error: string;
}
export const ErrorAlert : FC<ErrorProps> = ({error} : ErrorProps) => (
    <Alert variant="error">An error occured: {error}</Alert>
);

export const LoadingAlert: FC = () => (
    <Alert variant="info">Loading...</Alert>
);