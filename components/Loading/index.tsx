import { Flex } from "../Flex/Flex";

export const Loading = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100%",
        flex: 1,
        minHeight: "18rem",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="spinner-border" role="status" />
    </Flex>
  );
};
