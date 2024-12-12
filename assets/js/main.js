// if(window.location.pathname.split("/").pop()==='users.html'){
//     setTimeout(()=>{

//         fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((json) => {
            
//             let html= "";

//             for (const user of json) {
//                 console.log(user);
//                 html = html+`<tr>
//                                 <th>${user.id}</th>
//                                 <td>${user.name}</td>
//                                 <td>${user.username}</td>
//                                 <td>${user.email}</td>
//                                 <td>${user.address.city} - ${user.address.street} - ${user.address.suit}</td>
//                                 <td class="h-100">
//                                 <div class="fw-light d-flex gap-2 w-100 h-100 justify-content-center align-items-center">
//                                     <i class="bi bi-trash3"></i>
//                                     <i class="bi bi-pencil"></i>
//                                 </div>
//                                 </td>
//                             </tr>`
//             }
//             document.querySelector(".spinner-grow").classList.add("d-none")
//             document.querySelector("#table-body").innerHTML= html;
//         });
//     },3000)
// }