document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', () => ({
        users: [],
        showUsersError: false,
        showUsersLoading: true,
        itemsCount: 5,
        pagesCount: 0,
        currentPage: 2,
        
        getUsers(){
            setTimeout(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => { 
                this.users=json;
                this.paginationHandler();
            }).catch((Err)=>{
                console.log(Err);
                
                this.showUsersError=true
            }
            ).finally(()=>{
                this.showUsersLoading=false
            }
            )
            },1000)
        },
        paginationHandler(){
            this.pagesCount = Math.ceil(this.users.length/this.itemsCount);
            let fItemIndex = (this.currentPage*this.itemsCount)-this.itemsCount;
            let lItemIndex = this.currentPage*this.itemsCount;
            this.users=this.users.slice(fItemIndex,lItemIndex);
        }
    }))
})