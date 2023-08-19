import { Layout, Spinner, Text } from "@ui-kitten/components";

export default function Loading() {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size="giant" />
      <Text category="h1">Loading</Text>
    </Layout>
  );
}
