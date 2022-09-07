import useSWR from "swr";
import { swGet } from "../../utils/fetcher";
import Table from "../Table";

/**
 * name, model, manufacturer, passengers, cantidad de films.
 */
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model'
    },
    {
        title: 'Manufacturer',
        dataIndex: 'manufacturer',
        key: 'manufacturer'
    },
    {
        title: '# Passengers',
        dataIndex: 'passengers',
        key: 'passengers',
        render: (passengers: string) =>
            parseInt(passengers)
                ? parseInt(passengers).toLocaleString('ex-MX')
                : passengers,
    },
    {
        title: '# Films',
        dataIndex: 'films',
        key: 'films',
        render: (films: string[]) => films.length
    },
    {
        title: 'Credit\'s',
        dataIndex: 'cost_in_credits',
        key: 'cost_in_credits',
        render: (credits: string) =>
            parseInt(credits)
                ? (parseInt(credits) / 1000) + ' k'
                : credits,
    }
]

const Starships = () => {
    var { data, error } = useSWR('/starships', swGet);
    if (error) {
        return <p>{`Èrror: ${error}`}</p>
    }
    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <article>
            <Table columns={columns} data={data.results} />
        </article>
    )
}

export default Starships;