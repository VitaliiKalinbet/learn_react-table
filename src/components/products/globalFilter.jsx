import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem;
`;

const SearchText = styled.h2`
    margin: 0;
`;

const Input = styled.input`
  padding: 0.25rem;
`;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
    console.log('preGlobalFilteredRows :>> ', preGlobalFilteredRows);
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <SearchContainer>
      <SearchText>Search:</SearchText>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </SearchContainer>
  );
}