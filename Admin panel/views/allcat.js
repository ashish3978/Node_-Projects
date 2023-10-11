
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('subcat_id');
    const data = document.getElementById('data');
  
    dropdown.addEventListener('change', () => {
      const selectedValue = dropdown.value;
      console.log(`Selected value: ${selectedValue}`); //For Debugging

    
      fetch(`/allcatdata?selectedValue=${selectedValue}`)
        .then((response) => response.json())
        .then((tdata) => {
          console.log("Fetched data:", tdata); // Debug
          let tr = '';
          tdata.forEach((a)=>{
            tr += `<tr><td>${a._id}</td>
                      <td>${a.cat_id.catname}</td>
                      <td>${a.name}</td>
                      <td class='d-flex p-0'>
                      <button class="btn btn-outline-success m-2"><a href="/admin/editsubcategory/${a._id}">Edit</a></button>
                      <button class="btn btn-outline-danger m-2"><a href="/admin/delsubcategory/${a._id}">Delete</a></button>
                    </td>
                    </tr>`;
          })
          data.innerHTML = tr;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });

    const SearchBar = document.getElementById('SearchCat')
    SearchBar.addEventListener('keyup', () => {
      const selectedValue = SearchBar.value;
      console.log(`Selected value: ${selectedValue}`); //For Debugging

    
      fetch(`/GetSearchData?selectedValue=${selectedValue}`)
        .then((response) => response.json())
        .then((tdata) => {
          // console.log("Fetched data:", tdata); // Debug
          let tr = '';
          tdata.forEach((a)=>{
            tr += `<tr><td>${a._id}</td>
                      <td>${a.cat_id.catname}</td>
                      <td>${a.name}</td>
                      <td class='d-flex p-0'>
                        <button class="btn btn-outline-success m-2"><a href="/admin/editsubcategory/${a._id}">Edit</a></button>
                        <button class="btn btn-outline-danger m-2"><a href="/admin/delsubcategory/${a._id}">Delete</a></button>
                      </td>
                    </tr>`;
          })
          data.innerHTML = tr;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
      

      const Catdropdown = document.getElementById('cat_id');
    
      Catdropdown.addEventListener('change', () => {
        const selectedValue = Catdropdown.value;
        const result  = document.getElementById('sub_cat_id');
      
        fetch(`/allsubdata?selectedValue=${selectedValue}`)
        .then((response) => response.json())
        .then((tdata) => {
          let tr = '<option>--Select SubCategory--</option>';
          tdata.forEach((i)=>{
            tr += `<option value="${i._id}">${i.name}</option>`;
            })
            result.innerHTML = tr;
        })
      })
    })


