import React from 'react';
import { TableContainer } from './styles';

interface ItemData {
  ibge: string;
  anomes: string;
  siglauf: string;
  qtd_ben_bas: number;
  qtd_ben_var: number;
  qtd_ben_bvj: number;
  qtd_ben_bvn: number;
  qtd_ben_bvg: number;
  qtd_ben_bsp: number;
  id: string;
}

interface TableProps {
  list: ItemData[];
  deleteItem: (id: string) => void;
}
const Table: React.FC<TableProps> = ({ list, deleteItem }: TableProps) => {
  function handleClick(id: string) {
    deleteItem(id);
  }
  return (
    <TableContainer>
      <thead>
        <tr>
          <th>IBGE</th>
          <th>Ano/Mes</th>
          <th>Qtd Ben. Basicos</th>
          <th>Qtd Ben. Variaveis</th>
          <th>Qtd Ben. Jovem</th>
          <th>Qtd Ben. Nutriz</th>
          <th>Qtd Ben. Gestantes</th>
          <th>Qtd Ben. Pobreza</th>
          <th>UF</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: ItemData) => (
          <tr key={item.id}>
            <td>{item.ibge}</td>
            <td>{item.anomes}</td>
            <td>{item.qtd_ben_bas}</td>
            <td>{item.qtd_ben_var}</td>
            <td>{item.qtd_ben_bvj}</td>
            <td>{item.qtd_ben_bvn}</td>
            <td>{item.qtd_ben_bvg}</td>
            <td>{item.qtd_ben_bsp}</td>
            <td>{item.siglauf}</td>
            <td>
              <button type="button" onClick={() => handleClick(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default Table;
