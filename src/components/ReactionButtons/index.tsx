import { Pressable, Box, Text, HStack } from "native-base";
import React, { FC } from "react";
import { useAddReactionMutation } from "../../features/posts/postsSlice";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
};
import { Post } from "../../types/Models";
const ReactionButtons = ({item}:{item:Post}) => {
  const [addReaction] = useAddReactionMutation();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Pressable
        style={{ marginRight: 10 }}
        key={name}
        onPress={() => {
          const newValue = item.reactions[name] + 1;

          addReaction({
            ...item,
            reactions: { ...item.reactions, [name]: newValue },
          });
        }}
      >
        {({ isHovered, isFocused, isPressed }) => (
          <Box style={{ transform: [{ scale: isPressed ? 0.9 : 1 }] }}>
            <Text>
              {emoji} {item.reactions[name]}
            </Text>
          </Box>
        )}
      </Pressable>
    );
  });

  return (
    <HStack space={2} alignSelf={"center"}>
      {reactionButtons}
    </HStack>
  );
};
export default React.memo(ReactionButtons);
