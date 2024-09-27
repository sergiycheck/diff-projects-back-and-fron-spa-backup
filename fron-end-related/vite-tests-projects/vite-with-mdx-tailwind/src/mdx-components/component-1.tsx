import { MDXProvider } from "@mdx-js/react";
import MyMarkdown from "./Docs.mdx";

const components = {
  em: (props: any) => <i {...props} />,
};

const MdxPage1 = () => (
  <MDXProvider components={components}>
    <MyMarkdown />
  </MDXProvider>
);

export default MdxPage1;
