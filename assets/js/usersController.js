document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', () => ({
        users: [],
        pageUsers:[],
        showUsersError: false,
        showUsersLoading: true,
        itemsCount: 3,
        pagesCount: null,
        currentPage: 1,
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
            let fItemIndex = (this.currentPage*this.itemsCount)-this.itemsCount;
            let lItemIndex = this.currentPage*this.itemsCount;
            this.pageUsers=this.users.slice(fItemIndex,lItemIndex);
            console.log(this.currentPage);
        },
        pageChanger(action){
            action==='next'?this.currentPage++:this.currentPage--;
            this.pagesCount = Math.ceil(this.users.length/this.itemsCount);
            if(this.currentPage>this.pagesCount){this.currentPage = this.pagesCount};
            if(this.currentPage<1){this.currentPage = 1};
            this.paginationHandler();
        },
        perPageHandler(event){
            event.target.value>this.users.length?event.target.value = this.users.length
            :event.target.value<1?event.target.value = 1
            :event.target.value=Math.ceil(event.target.value);
            this.itemsCount=event.target.value;
            this.currentPage=1;
            this.paginationHandler();
        }
    }))
})