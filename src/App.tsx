import React, { useEffect, useState } from "react";
import { Tree } from "./utils/tree";
import { INode } from "./models/node";
import SvgCreator from "./components/svg.creator";

function App() {
  const [text, setText] = useState<string>(
    "Ali Taghi Naghi Gholi Ali Taghi Naghi"
  );

  const [binaryTree, setBinaryTree] = useState<{ node?: INode; maxDeep: number }>();

  useEffect(() => {
    drawBinaryTree();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const drawBinaryTree = () => {
    const tree = new Tree();
    const array = text.split(" ").filter((f) => f !== "");
    array.forEach((item) => {
      tree.add(item);
    });

    const node = tree.nodes();
    setBinaryTree({ node: node, maxDeep: tree.maxDeep });
  };

  return (
    <div className="app">
      <p className="text-center">
        لطفا نودهای درخت را وارد کنید. با فاصله نودها از هم جدا می‌شوند
      </p>
      <p className="text-center">A B C D E ...</p>
      <input
        type="text"
        className="w-full text-center py-2 input-search"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {binaryTree?.node && (
        <SvgCreator maxDeep={binaryTree?.maxDeep} node={binaryTree?.node} />
      )}
    </div>
  );
}

export default App;
