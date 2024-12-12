document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', () => ({
        users: [],
        showUsersLoading: true,
        getUsers(){
            setTimeout(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => { 
                this.users=json;
                this.showUsersLoading=false;
            })
            },3000)            
        }
    }))
})