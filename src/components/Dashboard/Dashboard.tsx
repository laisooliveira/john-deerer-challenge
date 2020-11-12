import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Table from '../Table/Table';
import api from '../../services/api';
import { Container, Header } from './styles';

interface Data {
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

const Dashboard: React.FC = () => {
  const [list, setList] = useState<Data[]>([]);
  const [searchUF, setSearchUF] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/?_start=0&_end=30');
        const arrayList = response.data.map((item: any) => {
          return {
            ...item,
            id: uuidv4(),
          };
        });
        setList(arrayList);
      } catch (err) {
        throw new Error(err);
      }
    }
    loadData();
  }, []);

  async function addItem() {
    try {
      const item: Data = {
        ibge: '110004',
        anomes: '201906',
        qtd_ben_bas: 1,
        siglauf: 'RJ',
        qtd_ben_var: 1,
        qtd_ben_bvj: 1,
        qtd_ben_bvn: 1,
        qtd_ben_bvg: 1,
        qtd_ben_bsp: 1,
        id: uuidv4(),
      };
      const response = await api.post('/', {
        ...item,
      });
      setList([...list, response.data]);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function deleteItem(id: string) {
    try {
      await api.delete(`/${id}`);
      setList(list.filter(itemList => itemList.ibge !== id));
    } catch (err) {
      throw new Error(err);
    }
  }

  async function searchItemsByUF(uf: string) {
    try {
      const response = await api.get(`/?siglauf_like=${uf}&_start=0&_end=30`);
      setList(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchUF(e.target.value);
    searchItemsByUF(e.target.value);
  }

  function sortAscendingOrder() {
    const listSorted = list.sort(
      (a: Data, b: Data) => a.qtd_ben_bas - b.qtd_ben_bas,
    );
    setList(listSorted);
  }

  function sortDescendingOrder() {
    const listSorted = list.sort(
      (a: Data, b: Data) => a.qtd_ben_bas - b.qtd_ben_bas,
    );
    setList(listSorted.reverse());
  }

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <input
          type="text"
          placeholder="Search by UF"
          onChange={handleChange}
          value={searchUF}
        />
        <div>
          <button type="button" onClick={addItem}>
            Add item
          </button>
          <button type="button" onClick={sortAscendingOrder}>
            Sort ascending
          </button>
          <button type="button" onClick={sortDescendingOrder}>
            Sort descending
          </button>
        </div>
      </Header>
      <Table list={list} deleteItem={deleteItem} />
    </Container>
  );
};

export default Dashboard;
