import React, {
  createElement,
  ReactSVGElement,
  useEffect,
  useState,
} from "react";
import { INode } from "../models/node";

/**
 * فاصله عرض مابین نود ها
 */
const spaceX = 100;
/**
 * فاصله ارتفاع نودها
 */
const spaceY = 150;
/**
 * شعاع دایره
 */
const circleR = 30;

interface IProps {
  node?: INode;
  maxDeep?: number;
}
const SvgCreator = (props: IProps) => {
  const { node, maxDeep = 1 } = props;

  const [svg, setSvg] = useState<ReactSVGElement>();

  useEffect(() => {
    const g = treeToSvg(node, (maxDeep * 500) / 2, 50, 1, maxDeep);
    const svg = createElement(
      "svg",
      {
        className: "mx-auto block",
        style: {
          width: maxDeep * 500,
          height: maxDeep * spaceY + 100,
          border: "1px solid black",
          borderRadius: 4,
          marginTop: 10,
        },
      },
      g
    );
    setSvg(svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  const createLine = (x1: number, x2: number, y1: number, y2: number) => {
    return createElement("line", {
      x1: x1,
      x2: x2,
      y1: y1,
      y2: y2,
      stroke: "black",
      strokeDasharray: "5, 2",
    });
  };

  const treeToSvg = (
    node?: INode,
    x: number = 0,
    y: number = 0,
    deep: number = 1,
    maxDeep: number = 0
  ): React.ReactSVGElement => {
    if (!node) return createElement("g");

    /**
     * فاصله قرارگیری در محور x
     * به این صورت که هر چقدر ارتفاع درخت بالاتر میره باید عرض درخت رو زیاد کنیم تا افزایش یال های درخت نمایش خوبی داشته باشه
     * به کارگیری دیپ برای این منظور که هر چقدر پایین تر حرکن میکنم فاصله نودها بهم نزدیک بشه
     */
    const space = (spaceX * maxDeep) / deep;
    const newX = x - space;
    const newXRight = x + space;
    const newY = y + spaceY;

    return createElement(
      "g",
      {},
      node.leftNode && createLine(x, newX, y, newY),
      node.rightNode && createLine(x, newXRight, y, newY),
      createElement("circle", {
        cx: x,
        cy: y,
        r: circleR,
        stroke: "black",
        strokeWidth: "2",
        fill: "white",
      }),
      createElement(
        "text",
        {
          x: x,
          y: y,
          textAnchor: "middle",
          stroke: "black",
          strokeWidth: 1,
          alignmentBaseline: "middle",
        },
        // x + " - " + y + " - " + deep + " - " + node.title
        // x + " - " + y + " - " + maxDeep + " - " + node.title
        node.title
      ),
      treeToSvg(node?.leftNode, newX, newY, deep + 1, maxDeep),
      treeToSvg(node?.rightNode, newXRight, newY, deep + 1, maxDeep)
    );
  };

  return <div style={{ overflow: "auto", height: "100vh" }}>{svg}</div>;
};

export default SvgCreator;
