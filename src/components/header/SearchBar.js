import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchQuertProducts, setSearchResults, useSearchResult } from "../../redux";
import { Typography } from "../shared";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const searchResult = useSearchResult();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchValue) {
        dispatch(fetchQuertProducts(searchValue));
      } else {
        dispatch(setSearchResults());
      }
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue]);

  return (
    <Autocomplete
      freeSolo
      className="searchBar"
      getOptionLabel={(option) => option.name}
      options={searchResult}
      renderOption={(_, option) => {
        const { name, category, _id, price } = option;
        return (
          <Link to={`/products/categories/${category}/${name}`} key={_id} state={{ id: _id }}>
            <Box sx={{ display: "flex" }}>
              <Typography>{name}</Typography>
            </Box>
          </Link>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="Search Product"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        );
      }}
    />
  );
};

export default SearchBar;
