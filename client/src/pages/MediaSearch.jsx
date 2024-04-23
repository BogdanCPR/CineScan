import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar, Popover, FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import genreApi from "../api/modules/genre.api";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;


const MediaSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({});


  const search = useCallback(
    async () => {
      setOnSearch(true);
      console.log("CALLBACK FUNCTION UP");
      const { response, err } = await mediaApi.search({
        mediaType,
        query,
        page
      });

      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        const filteredResults = response.results.filter((result) => {
          if (mediaType !== "people") {
            const genreIds = result.genre_ids || [];
            return Object.keys(selectedGenres).every((key) => {
              return selectedGenres[key] ? genreIds.includes(genres.find((genre) => genre.name === key).id) : true;
            });
          }
          return true;
        });
        if (page > 1) {
          if(mediaType === "people") setMedias([...medias, ...response.results]);
          else setMedias([...medias, ...filteredResults]);
        }
        else {
          if(mediaType === "people") setMedias(response.results);
          else setMedias(filteredResults);
        }
      }
    },
    [query, page,selectedGenres],
  );

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  useEffect(() => {
    console.log("USE EFFECT UP");

    if (mediaType === "people") return;
    const getGenres = async () => 
    {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });
      if (response) {
        setGenres(response.genres);
        dispatch(setGlobalLoading(false));
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };
    getGenres();
  }, [dispatch,mediaType]);

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  
  const handleGenreChange = (event) => {
    setSelectedGenres({ ...selectedGenres, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color: mediaType === item ? "primary.contrastText" : "text.primary"
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <Box sx={{ display: 'flex', width: '100%' }}>
      <TextField
        color="success"
        placeholder="Search CineScan"
        sx={{ flex: 1 }}
        autoFocus
        onChange={onQueryChange}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ maxHeight: '80vh' }}
      >
        <Box>
          <Stack 
            spacing={1}
            direction={"column"}
            margin={"1rem"}
          >
            {genres.map((genre) => (
              <FormControlLabel
                control={<Checkbox checked={selectedGenres[genre.name] || false} onChange={handleGenreChange} name={genre.name} />}
                label={genre.name}
              />
            ))}
          </Stack>
        </Box>
      </Popover>
      {mediaType !== 'people' && (
        <Button variant="contained" color="primary" onClick={handleClick}>
          Filters
        </Button>
      )}
      </Box>
          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() => setPage(page + 1)}
            >
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;