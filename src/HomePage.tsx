import React, { ChangeEvent, FC, useState, FormEvent } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useHistory } from "react-router";

const HomePage: FC = () => {
    const [search, setSearch] = useState<string>("");
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/search/${search}`);
    };

    return (
        <>
            <Form inline={true} onSubmit={submit}>
                <Form.Row>
                    <Form.Label>
              Enter your speedrun.com username
                    </Form.Label>
                    <Form.Control type="search" name="username"  value={search} onChange={handleChange}/>
                    <Button type="submit">Search!</Button>
                </Form.Row>
            </Form>
        </>
    );
};

export default HomePage;