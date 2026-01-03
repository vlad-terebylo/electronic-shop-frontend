import {useState, useEffect} from 'react';
import axios from 'axios';

const ShowAllItems = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Отправка GET-запроса к вашему бэкенду
        axios.get('http://localhost:1409/shop/items')
            .then(response => {
                console.log(response.data); // Посмотрите, что возвращает сервер
                setData(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []); // пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании компонента

    return (
        <div>
            <h1>Data from server:</h1>
            {/* Если данные загружены, отображаем их, иначе выводим сообщение о загрузке */}
            {data ? (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>
                            <h2>Item {index + 1}</h2>
                            {displayData(item)} {/* Отображаем поля каждого объекта */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading data...</p>  // Сообщение, если данные еще загружаются
            )}
        </div>
    );
}

function displayData(data) {
    let output = '';
    for (let key in data) {
        output += `${key}: ${data[key]}\n`;
    }

    return output;
};


export default ShowAllItems;