import useSWR from "swr";
import { swGet } from "../../utils/fetcher";
import Table from '../Table';
/**name, birth_year, height (en metros), cantidad de films */
const colums = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Birth year',
        dataIndex: 'birth_year',
        key: 'birth_year',
        render: (year: string) =>
            parseInt(year)
                ? parseInt(year)
                : year
    },
    {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
        render: (height: string) =>
            parseInt(height)
                ? (parseInt(height) / 100) + ' m'
                : height
    },
    {
        title: '# films',
        dataIndex: 'films',
        key: 'films',
        render: (films: string[]) => films.length
    },
]

const People = () => {
    var { data, error } = useSWR('/people', swGet);
    if (error) {
        return <p>{`Error: ${error}`}</p>
    }
    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <article>
            <Table columns={colums} data={data.results} />
        </article>
    )
}

export default People;