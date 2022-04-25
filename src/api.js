class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(new Error(`Ошибка ${res.status} : ${res.statusText}`))
    }

    getValues() {
        return fetch(`${this._baseUrl}`, {
            method: "GET",
        }).then((res) => this._checkResponse(res));
    }

}

const config = {
    baseUrl: "https://www.cbr-xml-daily.ru/archive/2022/02/11/daily_json.js",
};
const mainApi = new MainApi(config);
export default mainApi;