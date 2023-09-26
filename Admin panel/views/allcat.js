console.log("DOMContentLoaded event fired");

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
                      <td>${a.name}</td><td><a href="/admin/editsubcategory/${a._id}">Edit</a><a href="/admin/delsubcategory/${a._id}">Delete</a></td>
                    </tr>`;
          })
          data.innerHTML = tr;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
  console.log("Hello, this script is running!");


