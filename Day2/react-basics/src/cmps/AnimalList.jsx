
export const animalInfos = [
    { type: 'Malayan Tiger', count: 787 },
    { type: 'Mountain Gorilla', count: 212 },
    { type: 'Fin Whale', count: 28 },
]

export function AnimalList({ animalinfos }) {
    // console.log('animalinfos', animalinfos)

    return <section className="animal-list">
        <h1>Rare Animals</h1>
        <table>
            <tbody>
                {animalinfos.map(({ type, count }, idx) =>
                    <tr key={type + idx}>
                        <td>{type}</td>
                        <td>{count}</td>
                        <td><a href={`https://www.google.com/search?q={type}`}>{type}</a></td>
                    </tr>
                )}
            </tbody>
        </table>
    </section>
}
