"use client";
import {Box, Button, Grid, TextField} from "@mui/material";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import React, {ChangeEvent, useCallback, useState} from "react";

export interface Params {
  id: string;
  name: string;
  email: string;
  body: string;
}

const Filters = () => {
  const [inputValues, setInputValues] = useState<Params>({
    id: "",
    name: "",
    email: "",
    body: "",
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };
  
  const createQueryString = (values: Params) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    return params.toString();
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = createQueryString(inputValues);
    if (queryParams) {
      router.push(pathName + "?" + queryParams);
    } else {
      router.push(pathName);
    }
  }, [inputValues]);
  
  const handleReset = () => {
    setInputValues({
      id: "",
      name: "",
      email: "",
      body: "",
    });
    router.push(pathName);
  }

  return (
    <Box marginBottom={"1rem"}>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} sm={2.5}>
          <TextField
            fullWidth
            label="Id"
            name="id"
            size="small"
            value={inputValues.id}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            size="small"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            size="small"
            value={inputValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            fullWidth
            label="Body"
            name="body"
            size="small"
            value={inputValues.body}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2} sx={{ display: "flex", gap: "1rem" }}>
          <Button variant="contained" size="medium" onClick={handleSubmit}>
            Search
          </Button>
          <Button variant="contained" size="medium" onClick={handleReset}>
            {"<"}            
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
