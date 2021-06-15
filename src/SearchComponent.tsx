import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { Search } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router";


const SearchComponent: FC = () => {
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
        <Form inline onSubmit={submit}>
            <InputGroup>
                <Form.Control type="search"  name="username" id="searchInput" placeholder="speedrun.com username" value={search} onChange={handleChange}/>
                <Button type="submit"><Search/></Button>
            </InputGroup>
        </Form>
    );
};

export default SearchComponent;