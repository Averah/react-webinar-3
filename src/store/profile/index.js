
import StoreModule from "../module";

class ProfileState extends StoreModule {

    initState() {
        return {
            user: {},
            isWaiting: false
        }
    }

    async getProfile() {
        this.setState({
            ...this.getState(),
            isWaiting: true
        });

        const authToken = localStorage.getItem('auth-token');

        try {
            const response = await fetch(`/api/v1/users/self`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'X-Token': authToken }
            });

            const json = await response.json();

            this.setState({
                ...this.getState(),
                user: json.result,
                isWaiting: false,
            });

        } catch (err) {
            this.setState({
                user: {},
                isWaiting: false,
            }, 'Ошибка авторизации');
        }
    }
}

export default ProfileState;
