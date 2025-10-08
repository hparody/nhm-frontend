import PropTypes from "prop-types";

import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { DEFAULT_CAMPIST } from "@/constants/campist";

const customAutocompleteOption = (props, option) => {
  const { key, ...optionProps } = props;
  return (
    <Box key={key} component="li" {...optionProps}>
      <Avatar
        alt={option.fullName}
        variant="rounded"
        sx={{
          mr: 2,
          flexShrink: 0,
          aspectRatio: 1,
          width: "36px",
          height: "36px",
          fontSize: "1.2rem",
        }}
      >{`${option.fullName.split(" ")[0][0]}${option.fullName.split(" ")[1][0]}`}</Avatar>
      {option.fullName}
    </Box>
  );
};

const CampistAutocomplete = ({
  id = "id_campist",
  label = "Campista",
  id_label = "id_campist_label",
  selectedCampist = DEFAULT_CAMPIST,
  campistsList,
  placeholder = "Selecciona un campista",
  onChange,
}) => {
  const [searchCampist, setSearchCampist] = useState("");

  return (
    <FormControl fullWidth required>
      <FormLabel id={id_label} htmlFor={id}>
        {label}
      </FormLabel>
      <Autocomplete
        id={id}
        aria-labelledby={id_label}
        value={selectedCampist}
        onChange={onChange}
        inputValue={searchCampist}
        onInputChange={(_, newInputValue) => setSearchCampist(newInputValue)}
        fullWidth
        autoComplete
        autoHighlight
        clearOnEscape
        options={campistsList}
        getOptionKey={(option) => option.sysId}
        getOptionLabel={(option) => option.fullName}
        renderInput={(params) => (
          <TextField fullWidth {...params} placeholder={placeholder} />
        )}
        renderOption={customAutocompleteOption}
      />
    </FormControl>
  );
};

CampistAutocomplete.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  id_label: PropTypes.string,
  selectedCampist: PropTypes.object,
  campistsList: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CampistAutocomplete;
