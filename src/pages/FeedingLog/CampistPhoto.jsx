import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";

import Avatar from "@mui/material/Avatar";

import DefaultManPhoto from "@/assets/man-icon.png";
import DefaultWomanPhoto from "@/assets/woman-icon.png";

const imagesBlobCache = new Map();

const getDefaultIconByGender = (gender) =>
  gender === "Hombre" ? DefaultManPhoto : DefaultWomanPhoto;

const imageURLToBlob = async (imageURL) => {
  let url = "";
  try {
    const res = await fetch(imageURL, { cache: "force-cache" });
    const blob = await res.blob();
    url = URL.createObjectURL(blob);
  } catch (err) {
    console.error("Failed to load image", err);
  }
  return url;
};

const CampistPhoto = ({ fullName, photoUrl, gender }) => {
  const [campistPhoto, setCampistPhoto] = useState(
    getDefaultIconByGender(gender)
  );

  const assignCampistPhoto = useCallback(
    async (photoUrl) => {
      if (photoUrl != "") {
        const src = await imageURLToBlob(photoUrl);
        imagesBlobCache.set(photoUrl, src);
        setCampistPhoto(src);
      }
    },
    [setCampistPhoto]
  );

  useEffect(() => {
    if (photoUrl !== "") {
      if (imagesBlobCache.has(photoUrl)) {
        setCampistPhoto(imagesBlobCache.get(photoUrl));
      } else {
        assignCampistPhoto(photoUrl);
      }
    } else {
      setCampistPhoto(getDefaultIconByGender(gender));
    }
  }, [photoUrl, gender, assignCampistPhoto, setCampistPhoto]);

  return (
    <Avatar
      alt={fullName || ""}
      src={campistPhoto}
      variant="rounded"
      sx={{
        width: "100px",
        height: "auto",
        marginRight: "8px",
      }}
      slotProps={{
        img: {
          sx: {
            aspectRatio: 1,
            objectFit: photoUrl !== "" ? "cover" : "contain",
            objectPosition: photoUrl !== "" ? "50% 20%" : "50% 50%",
            loading: "lazy",
          },
        },
      }}
    />
  );
};

CampistPhoto.propTypes = {
  fullName: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

export default CampistPhoto;
