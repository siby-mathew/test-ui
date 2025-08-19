import { useState } from "react";
import { Box, Flex, Image, IconButton } from "@chakra-ui/react";

import QuestImage from "@assets/quest.png";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

type QuestsType = {
  id: number;
  image: string;
};
export const QuestSlider = ({ quests }: { quests: QuestsType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? quests.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === quests.length - 1 ? 0 : prev + 1));
  };

  return (
    <Flex
      position="relative"
      overflow="hidden"
      w="full"
      maxW="350px"
      mx="auto"
      align="center"
      justify="center"
      flex={"auto"}
    >
      <IconButton
        aria-label="Previous Slide"
        icon={<IoIosArrowDropleft />}
        onClick={prevSlide}
        position="absolute"
        left={2}
        zIndex={2}
        size="sm"
        bg="transparent !important"
        fontSize={20}
        _hover={{
          opacity: 0.5,
        }}
      />

      <Flex
        w="full"
        transform={`translateX(-${currentIndex * 100}%)`}
        transition="transform 0.4s ease"
      >
        {quests.map((quest) => (
          <Box key={quest.id} flex="0 0 100%" px={4}>
            <Flex
              direction="column"
              borderRadius="lg"
              boxShadow="lg"
              align="center"
              textAlign="center"
              key={quest.id}
              px={5}
            >
              <Image borderRadius={15} w="100%" src={QuestImage} />
            </Flex>
          </Box>
        ))}
      </Flex>

      <IconButton
        aria-label="Next Slide"
        icon={<IoIosArrowDropright />}
        onClick={nextSlide}
        position="absolute"
        right={2}
        zIndex={2}
        size="sm"
        bg="transparent !important"
        fontSize={20}
        _hover={{
          opacity: 0.5,
        }}
      />
    </Flex>
  );
};
const quests: QuestsType[] = [
  {
    id: 1,
    image: QuestImage,
  },
  {
    id: 2,
    image: QuestImage,
  },
  {
    id: 3,
    image: QuestImage,
  },
];

export const Quests = () => {
  return (
    <Flex color="white" direction={"column"}>
      <Flex
        justifyContent={"space-between"}
        px={5}
        py={3}
        flex={"auto"}
        alignItems={"center"}
        maxH={"70"}
      >
        <Flex fontWeight={"bold"} fontSize={20}>
          Quests
        </Flex>
        <Flex>Referral</Flex>
      </Flex>
      <QuestSlider quests={quests} />
    </Flex>
  );
};
