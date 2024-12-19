document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', () => ({
        users: [],
        pageUsers:[],
        showUsersError: false,
        showUsersLoading: true,
        itemsCount: 3,
        pagesCount: null,
        currentPage: 1,
        searchObject:'',
        searchShow:false,
        backupUsersForSearch:null,
        searchResultsFlagShow:false,
        searchResultsFlag:null,
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
        },
        searchHandler(){
            if(!this.searchResultsFlagShow){
                if(this.searchObject==="")return false;
                // (this.backupUsersForSearch) && (this.users=[...this.backupUsersForSearch]);
                this.backupUsersForSearch=[...this.users];
                this.users=this.users.filter(user=>(
                    user.name.toLowerCase().includes(this.searchObject.toLowerCase()) 
                    || user.username.toLowerCase().includes(this.searchObject.toLowerCase()) 
                    || user.email.toLowerCase().includes(this.searchObject.toLowerCase()) 
                    || user.address.city.toLowerCase().includes(this.searchObject.toLowerCase()) 
                    || user.address.street.toLowerCase().includes(this.searchObject.toLowerCase()) 
                    || user.address.suite.toLowerCase().includes(this.searchObject.toLowerCase())
                ));
                this.searchResultsFlag  = this.searchObject;
                this.searchResultsFlagShow=true;
                this.paginationHandler();
            }else{
                this.users=[...this.backupUsersForSearch];
                this.backupUsersForSearch = null;
                this.searchObject = "";
                this.searchResultsFlag = null;
                this.searchResultsFlagShow=false;
                this.paginationHandler();
            }
        },
    }))
})