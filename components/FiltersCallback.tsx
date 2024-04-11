import { Box, Button, Grid, TextField } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { ChangeEvent, useCallback, useState } from "react";

interface Params {
  id: string;
  name: string;
  email: string;
  body: string;
}

const FiltersCallback = () => {
  const [inputValues, setInputValues] = useState<Params>({
    id: "",
    name: "",
    email: "",
    body: "",
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));
    },
    []
  );

  const createQueryString = useCallback((values: Params) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    return params.toString();
  }, [searchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const queryParams = createQueryString(inputValues);
      if (queryParams) {
        router.push(pathName + "?" + queryParams);
      }
      console.log("callback rendered");
      console.log(inputValues);
    },
    [createQueryString, inputValues, pathName, router]
  );

  const handleReset = useCallback(() => {
    setInputValues({
      id: "",
      name: "",
      email: "",
      body: "",
    });
    router.push(pathName);
  }, [pathName, router]);

  console.log("rerender happen");

  return (
    <Box marginBottom={"1rem"}>
      <Grid container spacing={2} alignItems={"center"}>
        {Object.entries(inputValues).map(([key, value]) => (
          <Grid item xs={12} sm={2.5} key={key}>
            <TextField
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              size="small"
              value={value}
              onChange={handleInputChange}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={2} sx={{ display: "flex", gap: "1rem" }}>
          <Button variant="contained" size="small" onClick={handleSubmit}>
            Search Logger
          </Button>
          <Button variant="contained" size="small" onClick={handleReset}>
            {"<"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FiltersCallback;
