import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameBooks, setPage, setSection } from "../../actions";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
//REACT ICONS
// import { RiSearch2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

//CSS
import styles from "./SearchBar.module.css";

//Componentes Chakra
import { Box, Flex, chakra, Center } from "@chakra-ui/react";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const copyAllBooks = useSelector((state) => state.copyAllBooks);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState([]);
  const { t } = useTranslation()
  const clearTitle = () => setTitle("");

  const handleChange = (event) => {
    const query = event.target.value;
    setTitle(query);
    setResult(
      copyAllBooks.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handledSubmit = (event) => {
    event.preventDefault();
    dispatch(setSection("search"));
    dispatch(setPage(0));
    dispatch(getNameBooks(title));
    setTitle("");
    history.push("/home");
  };

  return (
    <>
      <form onSubmit={handledSubmit}>
        {/* <Box fontFamily="Quicksand" position="relative">
                    <Box display="flex">
                        <Input
                            value={title}
                            onChange={handleChange}
                            width="90%"
                            focusBorderColor="#01A86C"
                            placeholder="Busca un Libro..."
                        />
                        <Box
                            zIndex={50}
                            borderRadius={5}
                            border="3px #F1F1F1"
                            bgColor="#F1F1F1"
                            width="34%"
                            pos="absolute"
                            top={10}
                        >
                            {!title || hidden
                                ? null
                                : copyAllBooks
                                      .filter((book) =>
                                          book.title
                                              .toLowerCase()
                                              .includes(title.toLowerCase())
                                      )
                                      .slice(0, 5)
                                      .map((book) => (
                                          <FormLabel
                                              key={book.id}
                                              onClick={handledSubmit}
                                              value={book.title}
                                              cursor="pointer"
                                              _hover={{
                                                  fontWeight: "semibold",
                                                  backgroundColor: "#01A86C",
                                              }}
                                              textAlign="center"
                                              width={"100%"}
                                          >
                                              {book.title}
                                          </FormLabel>
                                      ))}
                        </Box>
                        <Button title="Search" type="submit" bgColor="#01A86C">
                            <FiSearch size="2rem" />
                        </Button>
                    </Box>
                </Box> */}

        <Box
          fontFamily="Quicksand"
          position="relative"
          width="100%"
        >
            <Flex pos="relative" align="strech">
              <chakra.input
                type=""
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                maxLength={64}
                sx={{
                  w: "100%",
                  h: "44px",
                  pl: "44px",
                  fontWeight: "bold",
                  outline: 0,
                  borderRadius: "md",
                }}
                placeholder={t("buscar")}
                _placeholder={{ color: "#01A86C", opacity: 0.6 }}
                value={title}
                onChange={handleChange}
                className={styles.input}
              />

              <Center pos="absolute" left={3} h="44px">
                <FiSearch color="#01A86C" boxsize="18px" />
              </Center>
            </Flex>

            {title && (
              <Box position="absolute" top="100%" left={0} right={0} zIndex={100} bg="white" borderRadius="md" shadow="lg" mt={2}>
                <Box px={4}>
                  <Box borderTopWidth="1px" pt={2} pb={4}>
                    <SearchResults
                      searchResults={result}
                      clearTitle={clearTitle}
                    />
                  </Box>
                </Box>
              </Box>
            )}
        </Box>
      </form>
    </>
  );
}
