import { useState, useEffect } from "react";
import { Card, Col, Row, Skeleton, Button } from 'antd';

import { Pokemons } from '../../models/pokemon'
const API = 'http://localhost:8000';

function Home() {
    const [data, setData] = useState<Pokemons[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nexpage, setNextPage] = useState(null);
    const [previouspage, setPreviusPage] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        await fetch(`${API}/sql/pokemons/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `A Requisição deu erro: O status é ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
                // console.log(actualData)
                // debugger
                setData(actualData.data);
                setNextPage(actualData.next_page);
                setPreviusPage(actualData.previous_page);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    return <>
        <h1>API Pokemon Local</h1>
        <h1>Next Page {nexpage} </h1>
        <h1>Previus Page {previouspage} </h1>
        {error && (
            <div>{`Aconteu um problema para buscar os dados - ${error}`}</div>
        )}
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {data &&
                    data.map(({ id, name, image }) => (
                        <Col key={id} span={8}>
                            <Skeleton loading={loading} avatar active>
                                <Card title={name.toUpperCase()} bordered={true} cover={
                                    <img
                                        alt={name}
                                        src={image}
                                    />
                                } style={{ width: 300, marginTop: 16, textAlign: "center" }}>
                                    <Button type="primary">
                                        Detalhe
                                    </Button>
                                </Card>
                            </Skeleton>
                        </Col>
                    ))}
            </Row>
        </div>
    </>;
}

export default Home;
