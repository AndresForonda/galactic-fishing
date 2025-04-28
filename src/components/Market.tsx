import { FunctionComponent } from "preact";
import { MarketItem } from "../api";

interface MarketProps {
  items: MarketItem[];
}

export const Market: FunctionComponent<MarketProps> = ({ items }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item: MarketItem) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>
                <td>{item.cost}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
