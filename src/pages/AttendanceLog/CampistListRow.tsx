import { Campist } from "@/types";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

import CampistPhoto from "@/components/fields/CampistPhoto";

type CampistListRow = {
  campist: Campist;
  checked: boolean;
  onToggle: React.ChangeEvent;
};

const CampistListRow = ({ campist, checked = false, onToggle }) => {
  const labelId = `checkbox-list-secondary-label-${campist.sysId}`;

  return (
    <ListItem
      key={campist.sysId}
      secondaryAction={
        <Checkbox
          onChange={onToggle}
          checked={checked}
          edge="end"
          slotProps={{ input: { "aria-labelledby": labelId } }}
        />
      }
      disablePadding
      sx={checked ? { backgroundColor: "primary.lighter" } : {}}
    >
      <ListItemButton onClick={onToggle}>
        <ListItemAvatar>
          <CampistPhoto
            alt={campist.fullName}
            gender={campist.gender}
            photoUrl={campist.photo}
            sx={{ width: 40, height: 40, minWidth: 40 }}
          />
        </ListItemAvatar>
        <ListItemText
          id={labelId}
          primary={campist.fullName}
          secondary={
            campist.attendanceDays && (
              <Typography variant="body2">
                {`Días de asistencia: `}
                <Typography variant="body2" fontStyle="italic" component="span">
                  {campist.attendanceDays}
                </Typography>
              </Typography>
            )
          }
          slotProps={{
            primary: {
              fontWeight: "600",
              color: `${checked ? "black" : "black.light"}`,
            },
            secondary: { color: "gray.dark" },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default CampistListRow;
